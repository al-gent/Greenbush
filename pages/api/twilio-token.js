import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !phoneNumber) {
      return res.status(500).json({ error: 'Twilio credentials not configured' });
    }

    // Get TwiML App SID from environment variables
    // Since you only need to call one number, create a TwiML App in Twilio Console:
    //
    // Steps:
    // 1. Deploy your app to get a public URL (e.g., https://yourdomain.com)
    // 2. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/applications
    // 3. Create a new TwiML App
    // 4. Set Voice URL to: https://yourdomain.com/api/twilio-voice
    // 5. Copy the App SID and add to .env.local as TWILIO_TWIML_APP_SID
    //
    // For localhost: Use the same App SID (it points to your production URL)
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;
    
    if (!twimlAppSid) {
      return res.status(500).json({ 
        error: 'TWILIO_TWIML_APP_SID is required. Create a TwiML App in Twilio Console pointing to your production URL (https://yourdomain.com/api/twilio-voice), then set the App SID in .env.local' 
      });
    }

    // Create an Access Token
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    // Create a voice grant with the TwiML App SID
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twimlAppSid,
    });

    // Create an access token
    // IMPORTANT: AccessToken REQUIRES API Key SID and API Secret, NOT Account SID/Auth Token
    // You must create API Keys in Twilio Console: https://console.twilio.com/us1/develop/api-keys
    const identity = `user-${Date.now()}`; // Unique identity for each token request
    
    // API Key credentials are REQUIRED
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiSecret = process.env.TWILIO_API_SECRET;
    
    if (!apiKeySid || !apiSecret) {
      return res.status(500).json({ 
        error: 'TWILIO_API_KEY_SID and TWILIO_API_SECRET are required. Create API Keys in Twilio Console: https://console.twilio.com/us1/develop/api-keys',
        instructions: '1. Go to https://console.twilio.com/us1/develop/api-keys\n2. Click "Create API Key"\n3. Copy the SID and Secret\n4. Add to .env.local as TWILIO_API_KEY_SID and TWILIO_API_SECRET'
      });
    }
    
    // Create token with API Keys (required for AccessToken)
    const token = new AccessToken(accountSid, apiKeySid, apiSecret, {
      identity: identity,
    });

    // Add the voice grant to the token
    token.addGrant(voiceGrant);

    // Serialize the token to a JWT string
    const jwt = token.toJwt();
    
    // Validate token is a string
    if (typeof jwt !== 'string' || !jwt) {
      throw new Error('Failed to generate valid token');
    }

    // Log token info in development (first 50 chars only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Token generated successfully:', {
        length: jwt.length,
        preview: jwt.substring(0, 50) + '...',
        hasVoiceGrant: true,
        twimlAppSid: twimlAppSid
      });
    }

    res.status(200).json({ token: jwt, phoneNumber });
  } catch (error) {
    console.error('Error generating Twilio token:', error);
    const errorMessage = error.message || 'Failed to generate access token';
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

