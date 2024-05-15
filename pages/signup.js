import React, { useState } from 'react';
import styles from '/styles/login.module.css';
import { useCookies } from 'react-cookie';
import Dash from '../components/dash';
import DashboardHelp from '../components/dashboard-help';

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
  const [cookie, setCookie] = useCookies(['user']);

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
        console.log('data from .then', data);
        setFarmerAdded(data.farmerAdded);
        setCookie(
          'user',
          JSON.stringify({
            exists: true,
            farmcode: data.props.farmCode,
            pin: data.props.pin,
          }),
          {
            path: '/',
            expires: new Date(Date.now() + 31536000000), // 1 year in the future
            sameSite: true,
          },
        );
      });
  };

  return (
    <div>
      {farmerAdded ? (
        <div className={styles.signupDashContainer}>
          <h3> Nice work, {firstName}. Your account has been created. </h3>
          <p>
            The first thing you should do is click 'Edit Wholesale' and add the
            produce you have available.
          </p>
          <Dash
            client={farmCode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <DashboardHelp />
        </div>
      ) : (
        <div className={styles.signupContainer}>
          <h1>Farmer Sign Up</h1>
          <form onSubmit={addFarmer}>
            <label>
              Farm Name
              <input
                size="29"
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                required
              />
            </label>
            <label>
              Farmcode
              <input
                size="10"
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
              PIN
              <input
                size="10"
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </label>
            <small>
              Your pin should be a short sequence of numbers. You'll use this to
              view your orders and update what produce is available.
            </small>
            <label>
              First name
              <input
                size="10"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <small>Notifications go here when orders are placed.</small>
            <label>
              Phone Number
              <input
                size="10"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label>
              Your favorite vegetable
              <input
                size="10"
                type="text"
                value={favVeg}
                onChange={(e) => setFavVeg(e.target.value)}
              />
            </label>
          </form>
          <button onClick={addFarmer}>Sign Up</button>
          {/* <input type="submit" value="Sign Up" /> */}
        </div>
      )}
    </div>
  );
}
