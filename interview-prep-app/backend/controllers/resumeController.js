const ResumeParser = require('resume-parser'); // Use an appropriate library
const generateQuestions = require('../questionGenerator');

const parseResume = (req, res) => {
  const filePath = req.file.path;
  ResumeParser.parseResume(filePath, 'output.json', function (err, file) {
    if (err) throw err;
    const questions = generateQuestions(file);
    res.json({ message: 'Resume parsed successfully', questions });
  });
};

module.exports = { parseResume };
