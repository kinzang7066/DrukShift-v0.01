const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware — allow ALL origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:Oracle2025@cluster0.4mebvxb.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

// Models
const User = require('./models/User');
const QuizResult = require('./models/QuizResult');

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Save quiz result
app.post('/api/quiz', async (req, res) => {
    try {
        const { name, email, score, answers } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email });
        }
        const result = await QuizResult.create({
            userId: user._id,
            score,
            answers
        });
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
        const history = await QuizResult.find({ userId: user._id })
                                        .sort({ takenAt: -1 });
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin — get all results
app.get('/api/admin/results', async (req, res) => {
    try {
        const results = await QuizResult.find({}).sort({ takenAt: -1 });
        res.json({ results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});