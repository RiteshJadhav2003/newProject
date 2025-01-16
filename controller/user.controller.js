const db = require('../DB/db');

exports.getCurrentUser = (req, res) => {
    if (req.session.userId) {  // Check for userId instead of session.id
        db.execute('SELECT * FROM users WHERE id = ?', [req.session.userId])  // Use userId in the query
            .then(([rows]) => {
                if (rows.length > 0) {
                    const user = rows[0];
                    return res.status(200).json({ user });
                } else {
                    return res.status(401).json({ message: 'User not found' });
                }
            })
            .catch(err => {
                console.error('Error fetching user from database:', err);
                return res.status(500).json({ message: 'Error fetching user' });
            });
    } else {
        return res.status(401).json({ message: 'Not logged in' });
    }
};
