import React, { useState } from 'react';
import styles from '/styles/index.module.css';
import EditWholesale from '../components/edit-wholesale';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const [farmCode, setFarmCode] = useState('');
  const [pin, setPin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [farmName, setFarmName] = useState('');
  const [favVeg, setFavVeg] = useState('');
  const [phone, setPhone] = useState('');
  const [isCred, setIsCred] = useState(false);
  const [farmerAdded, setFarmerAdded] = useState(false);
  const [farmCodeTaken, setFarmCodeTaken] = useState(false);

  const isFarmCodeTaken = (e) => {
    e.preventDefault();
    fetch('/api/is-farmcode-taken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(farmCode),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFarmCodeTaken(data.exists);
      });
  };

  const addFarmer = (e) => {
    e.preventDefault();
    fetch('/api/add-farmer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        farmName,
        farmCode,
        pin,
        firstName,
        email,
        phone,
        favVeg,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      //then redirect??? then what?
      .then((data) => {
        console.log(data);
        setFarmerAdded(data.farmerAdded);
      });
  };

  return (
    <div className={styles.storyCard}>
      {farmerAdded ? (
        <div>
          <h1> Nice work, {firstName}.</h1>
          <h2>Your Account has been created.</h2>
          <p>Let's list some products you have for sale</p>
          <EditWholesale
            client={farmCode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      ) : (
        <div>
          <h1>Farmer Sign Up</h1>
          <div>
            <form onSubmit={addFarmer}>
              <label>
                Farm Name:
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                />
              </label>
              <label>
                Farmcode:
                <input
                  onBlur={isFarmCodeTaken}
                  type="text"
                  value={farmCode}
                  onChange={(e) => setFarmCode(e.target.value.toLowerCase())}
                  required
                />
              </label>
              <small>
                Your farmcode should be a short sequence of letters. Buyers will
                access your produce list by entering the farmcode after the
                website name. eg: adamlgent.com/yourfarmcode
              </small>
              <small>
                For example, if your farm name is Greenbush Growing Cooperative,
                your farmcode could be ggc or greenbush
              </small>
              {farmCodeTaken && (
                <p>
                  This farmcode is already taken! Please select a different one
                </p>
              )}
              <label>
                Pin:
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </label>
              <small>
                Your pin should be a short sequence of numbers. You'll use this
                to view your orders and update what produce is available.
              </small>
              <label>
                Your first name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <small>You'll get notified here when you get a new order.</small>
              <label>
                Phone Number:
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label>
                Your favorite vegetable:
                <input
                  type="text"
                  value={favVeg}
                  onChange={(e) => setFavVeg(e.target.value)}
                />
              </label>
              <small>I just like to know</small>
              <input type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
