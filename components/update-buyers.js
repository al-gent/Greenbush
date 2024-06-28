import { renderToString } from 'react-dom/server';
import WholesaleTable from './wholesale-table';
import React, { useState, useEffect } from 'react';
import styles from '../styles/update-buyers.module.css';
import sendEmail from './send-update-email';

export default function UpdateBuyers({ client }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [farm, setFarm] = useState({});
  const [emails, setEmails] = useState([]);
  const [enterEmail, setEnterEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [emailText, setEmailText] = useState('');
  const [emailsSent, setEmailsSent] = useState([]);
  const [playByPlay, setPlayByPlay] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/data?client=${encodeURIComponent(client)}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error:', error));

    fetch(`/api/get-farmer-info?client=${encodeURIComponent(client)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setFarm(JSON.parse(data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/get-emails?client=${encodeURIComponent(client)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setEmails(JSON.parse(data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setIsLoading(false);
      });
  }, [emails]);

  useEffect(() => {
    if (farm) {
      setSubject(`Produce Available from ${farm.farmname}`);
    }
  }, [farm]);

  function addEmail(e, email) {
    e.preventDefault();
    fetch(`/api/add-email?client=${encodeURIComponent(client)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  function deleteEmail(e, email) {
    e.preventDefault();
    fetch(`/api/remove-email?client=${encodeURIComponent(client)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  function emailCheckBox(email, index) {
    if (!email) return;
    else
      return (
        <div style={{ textAlign: 'left' }} key={index}>
          <input
            type="checkbox"
            id={email}
            name="email"
            value={email}
            defaultChecked
          />
          {email}
          <button
            style={{ scale: '75%' }}
            onClick={(e) => {
              deleteEmail(e, email);
              setEmails([...emails, email]);
            }}
          >
            Remove
          </button>
        </div>
      );
  }

  const emailBodyHTML = renderToString(
    <div>
      <p>{emailText}</p>
      <WholesaleTable products={products} farmName={farm.farmname} />
      <p>
        <a href={`http://www.adamlgent.com/${farm.farmcode}`}>Order now </a>
      </p>
    </div>,
  );

  async function handleEmailSending(e) {
    e.preventDefault();
    const form = e.target;
    const checkboxes = form.elements.email;
    const checkedEmails = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedEmails.push(checkboxes[i].value);
      }
    }

    console.log('sending emails to', checkedEmails);
    for (const email of checkedEmails) {
      setPlayByPlay(`sending email to ${email}`);
      const templateParams = {
        subject: subject,
        toEmail: email,
        fromEmail: farm.email,
        fromName: farm.farmname,
        emailBody: emailBodyHTML,
      };
      try {
        await sendEmail(templateParams);
        setEmailsSent((currentEmailsSent) => [...currentEmailsSent, email]);
        // I dont understand why this arrow function is needed, but it didn't work without it.
      } catch (error) {
        console.error('Failed to send email to', email, error);
        setPlayByPlay(`Failed to send email to ${email}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setPlayByPlay('');
  }
  return (
    <div className={styles.updateBuyers}>
      {emailsSent.length > 0 ? (
        <>
          {playByPlay ? (
            <h3>{playByPlay}</h3>
          ) : (
            <h1>Emails successfully sent</h1>
          )}
          <ul>
            {emailsSent.map((email) => (
              <li>{email}</li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h2>Update Buyers</h2>
          <div style={{ textAlign: 'left' }}>
            <h4>
              Subject line{' '}
              <input
                style={{ width: '100%', textAlign: 'left' }}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </h4>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h4>
              Message{' '}
              <textarea
                style={{ width: '100%', height: '3rem', textAlign: 'left' }}
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />
            </h4>
          </div>
          <WholesaleTable products={products} farmName={farm.farmname} />
          <h3>Which buyers?</h3>
          <form onSubmit={(e) => handleEmailSending(e)}>
            {emails.map((email, index) => emailCheckBox(email, index))}
            <div style={{ textAlign: 'left' }}>
              <input
                type="checkbox"
                value={enterEmail}
                name="email"
                checked={enterEmail !== ''}
              />
              <input
                type="text"
                value={enterEmail}
                onChange={(e) => setEnterEmail(e.target.value)}
              />
              <button
                onClick={(e) => {
                  setEmails([...emails, enterEmail]);
                  addEmail(e, enterEmail);
                  setEnterEmail('');
                }}
              >
                Add Email
              </button>
            </div>
            <button type="submit">Send Update</button>
          </form>
        </div>
      )}
    </div>
  );
}
