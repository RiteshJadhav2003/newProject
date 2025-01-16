const bcrypt = require('bcrypt');
const db = require('../DB/db');

exports.signup = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Email, name, and password are required' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const result = await db.execute(
        'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
        [email, name, hashedPassword]
      );
  
      console.log(result); // Log the result to inspect its structure
  
      if (result) {
        res.status(201).json({ message: 'User created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating user' });
      }
    } catch (err) {
      console.error('Error during signup:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already in use' });
      }
      return res.status(500).json({ message: 'Error creating user' });
    }
  };
  
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        console.log("Executing query for email:", email);
        const [rows, fields] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        console.log("Query Result (rows):", rows);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Correctly assign session userId
        req.session.userId = user.id;  // Ensure session is correctly set

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
};
