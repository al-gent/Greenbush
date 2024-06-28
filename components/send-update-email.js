import emailjs from '@emailjs/browser';

export default async function sendEmail(templateParams) {
  try {
    const result = await emailjs.send(
      'service_l0rokdr',
      'template1',
      templateParams,
      'XPX6vluS07arIqYtC',
    );
    console.log('Email sent', result.text);
    return result.text;
  } catch (error) {
    console.log('error sending email', error.text);
    throw error;
  }
}
