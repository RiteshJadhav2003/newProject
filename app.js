const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

// Database connection
const db = require('./DB/db');

// Test database connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the MySQL database');
        connection.release();
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
})();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials to be included
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // For development, change to `true` if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
}));

app.use((req, res, next) => {
    console.log("Session ID:", req.session.id); // Logs the session ID
    console.log("Session Data:", req.session); // Logs all session data
    next();
});


// Use Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
