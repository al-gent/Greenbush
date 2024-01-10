import React, { useEffect, useState } from 'react';
import styles from '../styles/wholesale.module.css';
export default function CommentBox({ onSubmit }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // useEffect(() => {
  //   fetch('/api/get-comments')
  //     .then((response) => response.json())
  //     .then(setComments);
  // }, []);

  return (
    <div className={styles.infoCard}>
      {submitted ? (
        <h2>Thank you for your comment!</h2>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            fetch('/api/add-comment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comment, name, email }),
            });
          }}
        >
          <h2 style={{ display: 'flex', justifyContent: 'center' }}>
            Leave a Comment
          </h2>
          <label>
            Your Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Your email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <textarea
              style={{ width: '100%', height: '5rem' }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
