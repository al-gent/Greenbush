import { useEffect, useState, useRef } from 'react';
import { Device } from '@twilio/voice-sdk';
import styles from '../styles/MiniChat.module.css';

export default function TwilioCall() {
  const [device, setDevice] = useState(null);
  const [call, setCall] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, ringing, connected
  const [error, setError] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const durationIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Ensure component only runs on client side (fix hydration error)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Twilio Device
  useEffect(() => {
    // Only initialize on client side
    if (!isMounted || typeof window === 'undefined') {
      return;
    }

    let newDevice = null;

    const initializeDevice = async () => {
      try {
        // Fetch access token from API
        const response = await fetch('/api/twilio-token', {
          method: 'POST',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || `HTTP ${response.status}: Failed to get access token`;
          console.error('Token API error:', errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Token response:', { hasToken: !!data.token, tokenType: typeof data.token, hasPhoneNumber: !!data.phoneNumber });
        
        const { token, phoneNumber } = data;

        // Validate token is a string
        if (!token) {
          console.error('No token in response:', data);
          throw new Error('No token received from server');
        }
        
        if (typeof token !== 'string') {
          console.error('Token is not a string:', { token, type: typeof token });
          throw new Error(`Invalid token type: expected string, got ${typeof token}`);
        }

        // Ensure token is not empty
        if (token.trim().length === 0) {
          console.error('Token is empty string');
          throw new Error('Token is empty');
        }

        // Ensure token is definitely a string
        const tokenString = String(token).trim();
        if (!tokenString) {
          throw new Error('Token is empty after conversion to string');
        }
        
        // Log token info for debugging (first and last 20 chars only for security)
        console.log('Creating device with token:', {
          length: tokenString.length,
          startsWith: tokenString.substring(0, 20),
          endsWith: tokenString.substring(tokenString.length - 20),
          isJWT: tokenString.split('.').length === 3
        });

        // Create new Twilio Device with token directly in constructor
        console.log('Creating Device instance...');
        newDevice = new Device(tokenString, {
          logLevel: 1, // Temporarily increase to see what's happening
          allowIncomingWhileBusy: false,
        });

        console.log('Device created, setting up event listeners...');

        // Set up event listeners BEFORE the device initializes
        newDevice.on('registered', () => {
          console.log('✅ Device registered successfully!');
          // For outbound-only calls, 'registered' state means the device is ready
          // The 'ready' event may not fire for outbound-only setups
          console.log('Device is registered - setting as ready for outbound calls');
          setIsReady(true);
          setError(null);
        });

        newDevice.on('ready', () => {
          console.log('✅ Device is ready!');
          setIsReady(true);
          setError(null);
        });

        newDevice.on('error', (error) => {
          console.error('Device error:', error);
          const errorMessage = error.message || error.toString() || 'Device error occurred';
          setError(errorMessage);
          setIsReady(false);
        });

        newDevice.on('offline', () => {
          console.log('Device went offline');
          setIsReady(false);
        });

        newDevice.on('incoming', (incomingCall) => {
          // Handle incoming calls if needed
          console.log('Incoming call:', incomingCall);
        });

        newDevice.on('tokenWillExpire', async () => {
          // Refresh token when it's about to expire
          try {
            const response = await fetch('/api/twilio-token', {
              method: 'POST',
            });
            const data = await response.json();
            const newToken = String(data.token).trim();
            if (newToken && typeof newToken === 'string') {
              newDevice.updateToken(newToken);
            } else {
              console.error('Invalid token received for refresh:', data);
            }
          } catch (err) {
            console.error('Error refreshing token:', err);
          }
        });

        console.log('Event listeners set up, device state:', newDevice.state);
        
        setDevice(newDevice);
        
        // Check if device is already registered/ready
        if (newDevice.state === 'registered' || newDevice.state === 'ready') {
          console.log('Device is already in state:', newDevice.state);
          setIsReady(true);
        } else {
          // Explicitly register the device
          // Some SDK versions require explicit registration even for outbound calls
          console.log('Attempting to register device...');
          try {
            newDevice.register();
            console.log('Register() called, waiting for registration...');
          } catch (registerError) {
            console.error('Error calling register():', registerError);
          }
        }
        
        // Add a timeout to show if device doesn't become ready
        setTimeout(() => {
          if (!isReady && !error) {
            console.warn('Device has not become ready after 10 seconds. Current state:', {
              isReady,
              error,
              deviceState: newDevice?.state,
              deviceToken: newDevice?.token ? 'present' : 'missing'
            });
            
            // Try to get more info about why it's not registering
            if (newDevice?.state === 'unregistered') {
              console.error('Device is still unregistered. Possible issues:');
              console.error('1. Invalid or expired token');
              console.error('2. Network connectivity issues');
              console.error('3. Twilio service unavailable');
              console.error('4. Token missing required grants');
            }
          }
        }, 10000);
      } catch (err) {
        console.error('Error initializing device:', err);
        setError(err.message || 'Failed to initialize calling');
      }
    };

    initializeDevice();

    // Cleanup on unmount
    return () => {
      if (newDevice) {
        newDevice.destroy();
      }
    };
  }, [isMounted]);

  // Start call duration timer
  useEffect(() => {
    if (callStatus === 'connected' && !durationIntervalRef.current) {
      startTimeRef.current = Date.now();
      durationIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCallDuration(elapsed);
      }, 1000);
    } else if (callStatus !== 'connected' && durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
      setCallDuration(0);
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [callStatus]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = async () => {
    if (!device || !isReady) {
      setError('Device not ready. Please wait...');
      return;
    }

    try {
      setError(null);
      setCallStatus('connecting');

      // Fetch phone number from token endpoint
      const response = await fetch('/api/twilio-token', {
        method: 'POST',
      });
      const { phoneNumber } = await response.json();

      // Make the call
      const newCall = await device.connect({
        params: { To: phoneNumber },
      });

      // Set up call event listeners
      newCall.on('accept', () => {
        setCallStatus('connected');
      });

      newCall.on('disconnect', () => {
        setCallStatus('idle');
        setCall(null);
        setIsMuted(false);
      });

      newCall.on('cancel', () => {
        setCallStatus('idle');
        setCall(null);
      });

      newCall.on('error', (error) => {
        console.error('Call error:', error);
        setError(error.message || 'Call failed');
        setCallStatus('idle');
        setCall(null);
      });

      setCall(newCall);
    } catch (err) {
      console.error('Error making call:', err);
      setError(err.message || 'Failed to make call');
      setCallStatus('idle');
    }
  };

  const handleHangup = () => {
    if (call) {
      call.disconnect();
      setCall(null);
      setCallStatus('idle');
      setIsMuted(false);
    }
  };

  const handleMute = () => {
    if (call) {
      if (isMuted) {
        call.mute(false);
        setIsMuted(false);
      } else {
        call.mute(true);
        setIsMuted(true);
      }
    }
  };

  // Don't render until mounted (prevents hydration error)
  if (!isMounted) {
    return (
      <div className={styles.container}>
        <div className={styles.suggestionBlock}>
          <div className={styles.botMsg}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isReady && !error && (
        <div className={styles.suggestionBlock}>
          <div className={styles.botMsg}>Initializing calling...</div>
        </div>
      )}

      {error && (
        <div className={styles.suggestionBlock}>
          <div className={styles.botMsg} style={{ color: '#d32f2f' }}>
            Error: {error}
          </div>
        </div>
      )}

      {isReady && callStatus === 'idle' && (
        <div className={styles.suggestionBlock}>
          <button className={styles.promptBtn} onClick={handleCall}>
            📞 Call Adam
          </button>
        </div>
      )}

      {callStatus === 'connecting' && (
        <div className={styles.chatWindow}>
          <div className={styles.botMsg}>Connecting...</div>
        </div>
      )}

      {callStatus === 'connected' && call && (
        <div className={styles.chatWindow}>
          <div className={styles.botMsg}>
            <strong>Call Connected</strong>
            {callDuration > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>
                {formatDuration(callDuration)}
              </div>
            )}
          </div>
          <div className={styles.inputRow} style={{ marginTop: '1rem' }}>
            <button
              onClick={handleMute}
              className={styles.sendBtn}
              style={{
                backgroundColor: isMuted ? '#d32f2f' : '#077fffd3',
                flex: 1,
              }}
            >
              {isMuted ? '🔇 Unmute' : '🔊 Mute'}
            </button>
            <button
              onClick={handleHangup}
              className={styles.sendBtn}
              style={{
                backgroundColor: '#d32f2f',
                flex: 1,
              }}
            >
              📞 Hang Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

