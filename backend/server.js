const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Replace with your Gmail address
        pass: process.env.GMAIL_PASS // Your App Password (already set up)
    }
});

// Email Sending Function
async function sendEmail(data) {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `
            Name: ${data.name}
            Phone: ${data.phone}
            Email: ${data.email}
            Company: ${data.company}
            Message: ${data.message}
        `
    };

    return transporter.sendMail(mailOptions);
}

// Form Submission Route
app.post('/submit', async(req, res) => {
    const { name, phone, email, company, message } = req.body;

    // Validate that all fields are provided
    if (!name || !phone || !email || !company || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Send Email
        await sendEmail(req.body);

        // Respond with success
        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));