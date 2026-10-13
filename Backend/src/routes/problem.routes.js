const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const difficultyQuery = req.query.difficulty || '';
        const pageQuery = parseInt(req.query.page) || 1;
        const limitQuery = parseInt(req.query.limit) || 10;

        const page = Number.isInteger(pageQuery) && pageQuery > 0 ? pageQuery : 1;
        const limit = Number.isInteger(limitQuery) && limitQuery > 0 ? limitQuery : 10;

        const allowedDifficulties = ['Easy', 'Medium', 'Hard'];
        if (difficultyQuery && !allowedDifficulties.includes(difficultyQuery)) {
            return res.status(400).json({ message: "Difficulty must be Easy, Medium, or Hard!!" });
        }

        const filter = {};
        if (searchQuery.trim()) {
            filter.title = { $regex: searchQuery.trim(), $options: 'i' };
        }
        if (difficultyQuery) {
            filter.difficulty = difficultyQuery;
        }

        const [problems, total] = await Promise.all([
            Problem.find(filter)
                .sort({ title: 1 })
                .skip((page - 1) * limit)
                .limit(limit),

            Problem.countDocuments(filter)
        ]);

        res.json({
            problems,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        });

    } catch (err) {
        res.status(500).json({ message: "unable to generate problems", err });
    }
});

module.exports = router;