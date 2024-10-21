// classManager.js

const axios = require('axios');
const db = require('./db'); // Assume you have a database module

async function fetchPhoneNumbersForClass(classId) {
  // Implementation depends on your database structure
  // This is just a placeholder
  return db.query('SELECT phone_number FROM class_attendees WHERE class_id = ?', [classId]);
}

async function getClassName(classId) {
  // Implementation depends on your database structure
  // This is just a placeholder
  const result = await db.query('SELECT name FROM classes WHERE id = ?', [classId]);
  return result[0]?.name;
}

async function endClass(classId) {
  const phoneNumbers = await fetchPhoneNumbersForClass(classId);
  const className = await getClassName(classId);

  for (const phoneNumber of phoneNumbers) {
    try {
      await axios.post('http://localhost:3000/api/send-notification', {
        phoneNumber,
        className
      });
      console.log(`Notification sent to ${phoneNumber}`);
    } catch (error) {
      console.error(`Failed to send notification to ${phoneNumber}:`, error);
    }
  }
}

module.exports = {
  endClass
};