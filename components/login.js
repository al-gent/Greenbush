import React, { useState } from 'react';
import styles from '/styles/login.module.css';
import { useCookies } from 'react-cookie';

export default function Login({
  farmCode,
  setFarmCode,
  pin,
  setPin,
  isCred,
  setIsCred,
}) {
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [staySignedIn, setStaySignedIn] = useState(true);

  const logout = (e) => {
    removeCookie('user', { path: '/' });
    location.reload();
  };

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
        if (data.exists && staySignedIn) {
          console.log('setting Cookie');
          setCookie('user', JSON.stringify(data), {
            path: '/',
            expires: new Date(Date.now() + 31536000000), // 1 year in the future
            sameSite: true,
          });
        }
      });
  };

  return (
    <div className={styles.loginContainer}>
      {isCred == false && (
        <div>
          <h2> Farmcode / pin incorrect.</h2>
          <h2>
            Please try again or{' '}
            <a style={{ color: 'blue' }} href="/signup">
              signup
            </a>
          </h2>
        </div>
      )}

      {isCred ? (
        <button onClick={logout}>logout</button>
      ) : (
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
          <div>
            <p htmlFor="staySignedIn">Stay signed in</p>
            <input
              type="checkbox"
              id="staySignedIn"
              name="staySignedIn"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      )}
    </div>
  );
}
