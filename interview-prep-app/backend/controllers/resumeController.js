// backend/controllers/resumeController.js
const fs = require('fs');
const path = require('path');
const { PythonShell } = require('python-shell');

// Function to handle resume upload and processing
exports.uploadResume = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // Use Python script to parse resume and generate questions
    const options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '../scripts'),
        args: [filePath]
    };

    PythonShell.run('resume_parser.py', options, (err, results) => {
        if (err) {
            console.error('Error parsing resume:', err);
            res.status(500).send('Error parsing resume');
        } else {
            const questions = JSON.parse(results[0]);
            res.json({ questions });
        }

        // Clean up uploaded file after parsing
        fs.unlinkSync(filePath);
    });
};
