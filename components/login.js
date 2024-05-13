import React from 'react';
import styles from '/styles/login.module.css';

export default function Login({
  farmCode,
  setFarmCode,
  pin,
  setPin,
  isCred,
  setIsCred,
}) {
  const checkCredential = (e) => {
    e.preventDefault();
    fetch('/api/check-credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ farmCode, pin }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setIsCred(data.exists);
      });
  };

  return (
    <div className={styles.loginContainer}>
      {isCred == false && (
        <div>
          <h2> Farmcode / pin incorrect.</h2>
          <h2>
            Please try again or <a href="/signup">signup</a>
          </h2>
        </div>
      )}
      <form onSubmit={checkCredential}>
        <h4>Farmcode:</h4>
        <input
          type="text"
          value={farmCode}
          onChange={(e) => setFarmCode(e.target.value)}
        />
        <h4>PIN:</h4>
        <input
          size="5"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
