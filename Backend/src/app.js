const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("LeetCode Revision Tracker API is running");
});

module.exports = app;