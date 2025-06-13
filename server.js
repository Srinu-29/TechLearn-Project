const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');
const courseRoute = require('./routes/courseRoute');
const progressRoute = require('./routes/progressRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Update CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize refresh tokens array
global.refreshTokens = [];

// Routes
app.use('/', authRoutes);
app.use('/' , postRoute);
app.use('/',courseRoute);
app.use('/', progressRoute);
// Test route
app.get('/', (req, res) => {
    res.json({ message: 'TechLearn API is running' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));