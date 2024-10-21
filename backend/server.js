const express = require('express');
const cors = require('cors');
const Parent = require('./models/Parent');
const connectDB = require('./config/db');


const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Parent registration endpoint
app.post('/api/parent/register', async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    
    if (!name || !phoneNumber) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }
    
    // Check if parent already exists
    const existingParent = await Parent.findOne({ phoneNumber });
    if (existingParent) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }
    
    // Create new parent
    const parent = new Parent({
      name,
      phoneNumber
    });
    
    await parent.save();
    
    res.json({
      message: 'Registration successful',
      parent: {
        id: parent._id,
        name: parent.name,
        phoneNumber: parent.phoneNumber
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Parent login endpoint
app.post('/api/parent/login', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    const parent = await Parent.findOne({ phoneNumber });
    
    if (!parent) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({
      message: 'Login successful',
      parent: {
        id: parent._id,
        name: parent.name,
        phoneNumber: parent.phoneNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get parent profile
app.get('/api/parent/profile/:parentId', async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.parentId);
    if (!parent) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    
    res.json({
      id: parent._id,
      name: parent.name,
      phoneNumber: parent.phoneNumber
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));