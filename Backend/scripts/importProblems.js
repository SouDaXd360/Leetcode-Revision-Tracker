require('dotenv').config();
const Problem = require("../src/models/Problem");
const connectDB = require("../src/db/db");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../dataset-download/leetcode-problems-master/leetcode-problems-master/merged_problems.json");
const rawData = fs.readFileSync(filePath,'utf-8');
const data = JSON.parse(rawData);

const questions = data.questions;

const problems = questions.map((question) => {
    const transformedProblem = {
        title: question.title,
        description: question.description,
        difficulty: question.difficulty,
        leetcodeId: Number(question.frontend_id),
        url: `https://leetcode.com/problems/${question.problem_slug}/`,
        topics: question.topics
    }
    return transformedProblem;
})


const ids = problems.map(p => p.leetcodeId);
const uniqueIds = new Set(ids);

console.log('Duplicate IDs:', ids.length - uniqueIds.size);

async function importProblems() {
    try {
        await connectDB();
        const bulkOperations = problems.map((problem) => {
            return{
                updateOne: {
                    filter: { leetcodeId: problem.leetcodeId },
                    update: { $set: problem },
                    upsert: true
                }
            }
        })

        await Problem.bulkWrite(bulkOperations);
        console.log('bulk write completed');
    } catch (error) {
        console.error('bulk write failed:', error.message);
    }
}

importProblems()

