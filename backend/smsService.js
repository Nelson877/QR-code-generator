const twilio = require('twilio');

// Your Twilio credentials
const accountSid = 'ACced37cbe7d49c7f06da9d00727a54376';
const authToken = 'f80562bf40a7abe31eaab2b945c839ca';
const client = twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: '+18649205170',
      to: to
    });
    console.log('SMS sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

module.exports = { sendSMS };