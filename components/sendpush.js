export async function sendPushNotification(title, message) {
    const key = process.env.SIMPLEPUSH_KEY; // put your key in .env

    const res = await fetch(`https://api.simplepush.io/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        key,
        title,
        msg: message
      })
    });
  
    if (!res.ok) {
      console.error('SimplePush failed:', await res.text());
    }
  }
  