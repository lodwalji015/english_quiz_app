const quizContainer = document.getElementById('quiz-container');
const feedbackContainer = document.getElementById('feedback-container');

// Fetch questions from backend
async function loadQuiz() {
    const response = await fetch('/questions');
    const questions = await response.json();

    questions.forEach((question) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${question.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        question.options.forEach((option) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.onclick = () => selectAnswer(question.id, option);
            optionsDiv.appendChild(optionButton);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

const userAnswers = {};

function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// Submit quiz answers
async function submitQuiz() {
    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers }),
    });
    const feedback = await response.json();
    displayFeedback(feedback);
}

function displayFeedback(feedback) {
    feedbackContainer.innerHTML = '<h2>Feedback</h2>';
    feedback.forEach((item) => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback';
        feedbackDiv.innerHTML = `<p>Question ${item.question_id}: ${item.is_correct ? "Correct" : "Incorrect"}</p>`;
        if (!item.is_correct) {
            feedbackDiv.innerHTML += `<p>Explanation: ${item.explanation}</p>`;
        }
        feedbackContainer.appendChild(feedbackDiv);
    });
}

// Load quiz on page load
loadQuiz();
