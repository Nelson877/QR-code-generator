export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    // Handle OPTIONS method for CORS preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // Handle POST method
    if (req.method === 'POST') {
      try {
        const { name, phoneNumber } = req.body;
        
        // Your login logic here
        // For this example, we'll just return the user data
        // In a real application, you'd want to validate against a database
        const parent = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          phoneNumber,
          timestamp: new Date().toISOString()
        };
  
        res.status(200).json({ parent });
      } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: 'Login failed' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  