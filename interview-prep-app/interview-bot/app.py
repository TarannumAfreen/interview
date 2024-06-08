from flask import Flask, request, render_template
from parser import parse_resume
from model import train_model
from questions import generate_questions

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['resume']
        resume_data = parse_resume(file)
        model = train_model(resume_data)
        questions = generate_questions(model, resume_data)
        return render_template('index.html', questions=questions)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
