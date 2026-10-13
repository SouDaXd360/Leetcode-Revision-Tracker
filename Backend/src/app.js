const express = require('express');
const problemRoutes = require('./routes/problem.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("LeetCode Revision Tracker API is running");
});

app.use('/api/problems', problemRoutes);

module.exports = app;