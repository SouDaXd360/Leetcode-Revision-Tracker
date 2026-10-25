require('dotenv').config();
const Problem = require("../src/models/Problem");
const mongoose = require("mongoose");
const connectDB = require("../src/db/db");

const problems = [
    {
        leetcodeId: 1,
        title: "Two Sum",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/two-sum/",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        topics: ["Array", "Hash Table"]
    },
    {
        leetcodeId: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        topics: ["Hash Table", "String", "Sliding Window"]
    },
    {
        leetcodeId: 42,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack"]
    }
]

async function seedProblems() {
    try {
        await connectDB();
        await Problem.insertMany(problems)
        console.log("Problems seeded successfully!");
    } catch (err) {
        console.error("Error seeding problems:", err);
    } finally {
        mongoose.connection.close();
    }
}

seedProblems();

