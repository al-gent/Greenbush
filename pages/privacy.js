export default function PrivacyPolicy() {
    return (
      <div style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.6,
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        color: '#333'
      }}>
        <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
          Sweeper Beeper Privacy Policy
        </h1>
        <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>Last Updated: January 5, 2026</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>1. Introduction</h2>
        <p>This Privacy Policy describes how we collect, use, and protect your information when you use our street sweeping notification service ("Service").</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>2. Information We Collect</h2>
        <p>When you use our Service, we collect:</p>
        <ul>
          <li><strong>Phone Number:</strong> Your mobile phone number to send SMS notifications</li>
          <li><strong>Location Data:</strong> Your vehicle's parked location to determine relevant street sweeping schedules</li>
          <li><strong>Usage Information:</strong> Records of when you subscribe, receive messages, and opt-out</li>
        </ul>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Send you SMS notifications about upcoming street sweeping schedules</li>
          <li>Match your location to the appropriate street sweeping schedule</li>
          <li>Improve and maintain the Service</li>
          <li>Comply with legal obligations</li>
        </ul>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>4. Information Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties except:</p>
        <ul>
          <li><strong>Service Providers:</strong> We use Twilio to send SMS messages. Your phone number is shared with Twilio solely for message delivery</li>
          <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
          <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
        </ul>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>5. Data Retention</h2>
        <p>We retain your information for as long as you are subscribed to the Service. When you opt-out by texting "STOP", we will:</p>
        <ul>
          <li>Stop sending you notifications immediately</li>
          <li>Remove your active subscription data</li>
          <li>Retain minimal records as required for legal and operational purposes</li>
        </ul>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>6. Data Security</h2>
        <p>We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Opt-Out:</strong> Stop receiving messages at any time by texting "STOP"</li>
          <li><strong>Access:</strong> Request information about the data we have collected about you</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
        </ul>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>8. Children's Privacy</h2>
        <p>Our Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>9. California Privacy Rights</h2>
        <p>California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to request disclosure of information we collect and the right to request deletion of personal information.</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>10. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated Privacy Policy.</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>11. Third-Party Services</h2>
        <p>Our Service uses Twilio for SMS message delivery. Twilio's privacy practices are governed by their own privacy policy, available at https://www.twilio.com/legal/privacy</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>12. Contact Us</h2>
        <p>For questions about this Privacy Policy or to exercise your rights, please contact:<br />
        Email: [your email]<br />
        Or text "HELP" to the number from which you receive notifications.</p>
  
        <h2 style={{ color: '#34495e', marginTop: '30px' }}>13. SMS-Specific Disclosures</h2>
        <p>By providing your phone number, you agree to receive SMS messages. Message and data rates may apply based on your mobile carrier's plan. Carriers are not liable for delayed or undelivered messages.</p>
      </div>
    );
  }