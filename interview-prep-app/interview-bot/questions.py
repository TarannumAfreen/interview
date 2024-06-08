def generate_questions(model, resume_data):
    # Placeholder for question generation logic
    keywords = resume_data.split()[:5]  # Simplified keyword extraction
    questions = [f"Tell me about your experience with {kw}." for kw in keywords]
    return questions
