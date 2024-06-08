const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/api/resumes', resumeRoutes);

mongoose.connect('mongodb+srv://tarannumafren:8374405563@taracluster.ikkjssp.mongodb.net/interview-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
