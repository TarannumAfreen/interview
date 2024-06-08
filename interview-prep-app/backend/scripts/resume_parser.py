# backend/scripts/resume_parser.py
import sys
import json
import spacy

def parse_resume(filepath):
    nlp = spacy.load('en_core_web_sm')
    questions = []

    # Example logic to parse resume and generate questions
    with open(filepath, 'r', encoding='utf-8') as file:
        resume_content = file.read()

    doc = nlp(resume_content)

    # Extract skills, experiences, etc., and generate questions
    skills = [ent.text for ent in doc.ents if ent.label_ == 'SKILL']
    experiences = [ent.text for ent in doc.ents if ent.label_ == 'EXPERIENCE']

    if skills:
        questions.append(f"Can you tell me about your experience with {skills[0]}?")

    if experiences:
        questions.append(f"Describe a challenging project you worked on related to {experiences[0]}.")

    return json.dumps(questions)

if __name__ == '__main__':
    filepath = sys.argv[1]
    questions = parse_resume(filepath)
    print(questions)
