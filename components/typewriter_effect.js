import { useState, useEffect } from 'react';

export default function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, pause = 1500) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      const currentWord = words[wordIndex];
      let timeout;
  
      if (isDeleting) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          if (text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
          if (text === currentWord) {
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pause);
          }
        }, typingSpeed);
      }
  
      return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);
  
    return text;
  }