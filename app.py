from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data for questions
questions = [
    {
        "id": 1,
        "question": "You must avoid riding in a crowded bus or travelling in a metro during rush hour as both are ___ unpleasant experiences.",
        "options": ["quiet", "quite", "quieter", "quit"],
        "correct": "quite",
        "explanation": "The correct word is 'quite,' which means 'very.'"
    },
    {
        "id": 2,
        "question": "Had you not reached in time, we ___ have lost our lives.",
        "options": ["will", "would", "shall", "might"],
        "correct": "would",
        "explanation": "The sentence requires 'would' to convey a past hypothetical."
    },
]

# Route to fetch questions
@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

# Route to submit answers and get feedback
@app.route('/submit', methods=['POST'])
def submit_answers():
    answers = request.json.get("answers")
    feedback = []
    for question in questions:
        user_answer = answers.get(str(question["id"]))
        if user_answer:
            is_correct = user_answer == question["correct"]
            feedback.append({
                "question_id": question["id"],
                "user_answer": user_answer,
                "is_correct": is_correct,
                "explanation": question["explanation"] if not is_correct else ""
            })
    return jsonify(feedback)

if __name__ == '__main__':
    app.run(debug=True)
