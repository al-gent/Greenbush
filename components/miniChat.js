import { useEffect, useState } from 'react';
import styles from '../styles/MiniChat.module.css';
import ReactMarkdown from 'react-markdown';
const initialPrompts = [
  "What is Adam's most technically challenging project?",
  "Has Adam used AI or LLMs in real-world products?",
  "Learn more about Trivialy and how Adam built it.",
  "What kind of problems does flo.farm solve?",
  "Does Adam have experience working with geospatial data?",
  "Has Adam built anything end-to-end, from backend to frontend?",
  "What’s a project Adam led that made a real-world impact?",
  "Has Adam used machine learning in production?",
  "What's Adam's favorite Grateful Dead set?",
  "What’s Adam's approach to designing an AI product pipeline?",
  "How do you balance creativity and technical execution?",
  // "What are your greatest weaknesses?",
  "How would you explain your work to a non-technical stakeholder?",
  // 'Did you peak in high school?',
];

export default function MiniChat() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // rotate prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % initialPrompts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClickPrompt = async () => {
    const prompt = initialPrompts[promptIndex];
    setActive(true);
    await sendMessage(prompt);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', content: message };

    setIsLoading(true);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    const botMsg = { role: 'bot', content: data.reply };
    setConversation((prev) => [...prev, userMsg, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <div >
      {!active && (
        <div className={styles.suggestionBlock}>
          <button className={styles.promptBtn} onClick={handleClickPrompt}>
          💬 {initialPrompts[promptIndex]}
          </button>
        </div>
      )}

      {active && (
        <div className={styles.chatWindow}>
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={msg.role === 'user' ? styles.userMsg : styles.botMsg}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {isLoading && <div className={styles.botMsg}>Typing...</div>}
          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up..."
              className={styles.inputField}
            />
            <button
              onClick={() => sendMessage(input)}
              className={styles.sendBtn}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
