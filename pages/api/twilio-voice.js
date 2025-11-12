// TwiML endpoint for handling outbound calls
export default async function handler(req, res) {
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!phoneNumber) {
    return res.status(500).send('Phone number not configured');
  }

  // Return TwiML to dial the phone number
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>${phoneNumber}</Dial>
</Response>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}

