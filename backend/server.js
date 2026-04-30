const express  = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

// ── MIDDLEWARE ──
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") { return res.sendStatus(200); }
    next();
});
app.use(express.json());

// ── MONGODB ──
mongoose
  .connect("mongodb+srv://admin:Oracle2025@cluster0.4mebvxb.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

// ── MODELS ──
const User       = require('./models/User');
const QuizResult = require('./models/QuizResult');

// ── EMAIL TRANSPORTER ──
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chodenkinzang829@gmail.com',
        pass: 'tdwivmgiwykk femw'
    }
});

// ── OTP STORE (in memory) ──
// { email: { otp: '1234', expires: timestamp } }
var otpStore = {};

// ── ROUTES ──

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Send OTP
app.post('/api/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        // Generate 4-digit OTP
        var otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Store OTP with 10 minute expiry
        otpStore[email] = {
            otp: otp,
            expires: Date.now() + 10 * 60 * 1000
        };

        // Send email
        await transporter.sendMail({
            from: '"DrukShift 🇧🇹" <chodenkinzang829@gmail.com>',
            to: email,
            subject: 'Your DrukShift Quiz Verification Code',
            html: `
                <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:480px;margin:0 auto;background:#f8fafd;padding:32px;border-radius:16px;">
                    <div style="text-align:center;margin-bottom:24px;">
                        <div style="font-size:32px">🇧🇹</div>
                        <h2 style="font-family:Georgia,serif;color:#08192d;margin:8px 0;">DrukShift</h2>
                        <p style="color:#7a9bb5;font-size:13px;margin:0;">Cryptocurrency Readiness Quiz · Bhutan 2026</p>
                    </div>
                    <div style="background:#ffffff;border-radius:12px;padding:28px;text-align:center;border:1px solid #e4eaf2;">
                        <p style="color:#08192d;font-size:15px;margin-bottom:20px;">Your verification code is:</p>
                        <div style="font-size:48px;font-weight:700;color:#2a9d8f;letter-spacing:12px;font-family:Georgia,serif;">${otp}</div>
                        <p style="color:#7a9bb5;font-size:12px;margin-top:20px;">This code expires in <strong>10 minutes</strong>.</p>
                        <p style="color:#7a9bb5;font-size:12px;">If you did not request this, please ignore this email.</p>
                    </div>
                    <p style="text-align:center;color:#7a9bb5;font-size:11px;margin-top:20px;">Kinzang Choden · BDS Internship 2026 · Bhutan Data Scientists Pvt. Ltd</p>
                </div>
            `
        });

        console.log('OTP sent to:', email, '— Code:', otp);
        res.json({ success: true, message: 'OTP sent successfully' });

    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ error: 'Failed to send OTP. Please check your email.' });
    }
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

        var stored = otpStore[email];

        if (!stored) {
            return res.status(400).json({ error: 'No OTP found. Please request a new one.' });
        }
        if (Date.now() > stored.expires) {
            delete otpStore[email];
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }
        if (stored.otp !== otp.toString()) {
            return res.status(400).json({ error: 'Incorrect code. Please try again.' });
        }

        // OTP verified — clear it
        delete otpStore[email];
        res.json({ success: true, message: 'Email verified successfully!' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save quiz result
app.post('/api/quiz', async (req, res) => {
    try {
        const { name, email, score, answers } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email });
        }
        const result = await QuizResult.create({ userId: user._id, score, answers });
        res.json({ success: true, userId: user._id, result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get quiz history by email
app.get('/api/quiz/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.json({ history: [] });
        const history = await QuizResult.find({ userId: user._id }).sort({ takenAt: -1 });
        res.json({ user, history });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin — get all users
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.json({ users });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin — get all results
app.get('/api/admin/results', async (req, res) => {
    try {
        const results = await QuizResult.find({}).sort({ takenAt: -1 });
        res.json({ results });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── START SERVER ──
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});