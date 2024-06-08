function generateQuestions(resumeData) {
    return [
      'Tell me about your experience at ' + resumeData.experience[0].company,
      'What skills did you use in your role as a ' + resumeData.experience[0].position + '?',
    ];
  }
  
  module.exports = generateQuestions;
  