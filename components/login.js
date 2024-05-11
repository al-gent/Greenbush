import React, { useState } from 'react';
import styles from '/styles/index.module.css';

export default function Login({
  farmCode,
  setFarmCode,
  pin,
  setPin,
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
    <div className={styles.dash}>
      <form onSubmit={checkCredential}>
        <label>
          Farmcode:
          <input
            type="text"
            value={farmCode}
            onChange={(e) => setFarmCode(e.target.value)}
          />
        </label>
        <label>
          Pin:
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
