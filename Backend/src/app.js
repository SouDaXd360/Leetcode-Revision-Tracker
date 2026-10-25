const express = require('express');
const problemRoutes = require('./routes/problem.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("LeetCode Revision Tracker API is running");
});

app.use('/api/problems', problemRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;