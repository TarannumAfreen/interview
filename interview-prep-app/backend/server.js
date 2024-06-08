// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { PythonShell } = require('python-shell');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle resume upload
app.post('/api/upload', upload.single('resume'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Use Python script to parse resume and generate questions
    const options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, 'scripts'),
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
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
