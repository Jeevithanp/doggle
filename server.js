const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Admin password for authentication
const ADMIN_PASSWORD = "admin123"; // Change this to any secure password you prefer

// In-memory database for votes and voters
let votes = { 'Python': 0, 'Java': 0, 'R': 0 };
let voters = {}; // Store voter details to prevent duplicate votes

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, and JS from 'public' folder

// Route to handle vote submission
app.post('/vote', (req, res) => {
    const { name, age, gender, option } = req.body;

    // Age validation
    if (age < 15) {
        return res.json({ success: false, message: 'Age must be 15 or above.' });
    }

    // Prevent duplicate votes by checking the voter's name
    if (voters[name]) {
        return res.json({ success: false, message: 'You have already voted.' });
    }

    // Validate the selected option
    if (votes[option] !== undefined) {
        votes[option]++; // Increment the vote count for the selected option
        voters[name] = { age, gender, option }; // Store voter details to prevent duplicate votes
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid voting option.' });
    }
});

// Route to serve vote data for admin dashboard
app.get('/votes', (req, res) => {
    res.json(votes);
});

// Route to serve voter details for admin dashboard
app.get('/voters', (req, res) => {
    res.json(voters);
});

// Route to handle admin login
app.post('/admin-login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
