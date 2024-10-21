const twilio = require('twilio');

// Your Twilio credentials

process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN

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