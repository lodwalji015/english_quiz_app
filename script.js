const quizContainer = document.getElementById('quiz-container');
const feedbackContainer = document.getElementById('feedback-container');

const questionsPool = [
    {
        question: "The quality of the fruits and vegetables ___ not good.",
        options: ["are", "were", "is", "have been"],
        correct: "is",
        explanation: "The subject is 'quality,' which is singular, so we use 'is'."
    },
    {
        question: "The Eiffel Tower is ___ unique structure in Paris.",
        options: ["an", "a", "the", "no article"],
        correct: "a",
        explanation: "Use 'a' because 'unique' starts with a 'yu' sound, not a vowel sound."
    },
    // Add more questions here...
];

// Function to shuffle and select 20 questions
function selectRandomQuestions(pool, numQuestions = 20) {
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Load and display quiz questions
function loadQuiz() {
    const selectedQuestions = selectRandomQuestions(questionsPool);

    selectedQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        question.options.forEach((option) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.onclick = () => selectAnswer(index, option);
            optionsDiv.appendChild(optionButton);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });

    // Save selected questions for checking answers
    window.selectedQuestions = selectedQuestions;
}

const userAnswers = {};

function selectAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer;
}

// Submit and check answers
function submitQuiz() {
    feedbackContainer.innerHTML = '<h2>Feedback</h2>';
    window.selectedQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback';
        feedbackDiv.innerHTML = `<p>Question ${index + 1}: ${isCorrect ? "Correct" : "Incorrect"}</p>`;

        if (!isCorrect) {
            feedbackDiv.innerHTML += `<p>Correct Answer: ${question.correct}</p>`;
            feedbackDiv.innerHTML += `<p>Explanation: ${question.explanation}</p>`;
        }

        feedbackContainer.appendChild(feedbackDiv);
    });
}

// Load quiz on page load
loadQuiz();
