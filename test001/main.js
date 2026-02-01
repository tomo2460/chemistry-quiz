// Game State
let currentQuestionIndex = 0;
let score = 0;
let questionsData = [];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const progressBarFill = document.getElementById('progress-fill');
const feedbackEl = document.getElementById('feedback');
const feedbackIconEl = document.getElementById('feedback-icon');
const feedbackTextEl = document.getElementById('feedback-text');
const explanationTextEl = document.getElementById('explanation-text');

const scoreCountEl = document.getElementById('score-count');
const totalCountEl = document.getElementById('total-count');
const resultMessageEl = document.getElementById('result-message');

// Initialize
function init() {
    // If questions variable is available from questions.js
    if (typeof questions !== 'undefined') {
        questionsData = questions;
    } else {
        console.error("Questions data not found!");
        return;
    }

    startBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', handleNextButton);
    restartBtn.addEventListener('click', restartGame);
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    showScreen(quizScreen);
    loadQuestion();
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function loadQuestion() {
    const currentQuestion = questionsData[currentQuestionIndex];

    // Update Progress
    const progressPercent = ((currentQuestionIndex) / questionsData.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    // Reset UI
    feedbackEl.classList.add('hidden');
    choicesContainer.innerHTML = '';

    // Set Text
    questionNumberEl.textContent = `Q.${currentQuestionIndex + 1}`;
    questionTextEl.textContent = currentQuestion.text;

    // Create Buttons
    currentQuestion.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn');
        btn.textContent = choice;
        btn.dataset.index = index;
        btn.addEventListener('click', selectAnswer);
        choicesContainer.appendChild(btn);
    });
}

function selectAnswer(e) {
    // Disable all buttons to prevent double clicking
    const buttons = choicesContainer.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);

    const selectedBtn = e.target;
    const selectedIndex = parseInt(selectedBtn.dataset.index);
    const correctIndex = questionsData[currentQuestionIndex].correctIndex;

    // Show Correct/Wrong
    if (selectedIndex === correctIndex) {
        score++;
        selectedBtn.classList.add('correct');
        showFeedback(true);
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight the correct one
        buttons[correctIndex].classList.add('correct');
        showFeedback(false);
    }
}

function showFeedback(isCorrect) {
    feedbackEl.classList.remove('hidden');
    feedbackIconEl.textContent = isCorrect ? '⭕️' : '❌';
    feedbackTextEl.textContent = isCorrect ? '正解！' : '残念...';
    feedbackTextEl.style.color = isCorrect ? 'var(--correct-color)' : 'var(--wrong-color)';

    explanationTextEl.textContent = questionsData[currentQuestionIndex].explanation;

    // If it's the last question, change button text? No, keep "Next" logic or directly show "See Results"
    if (currentQuestionIndex === questionsData.length - 1) {
        nextBtn.textContent = '結果を見る';
    } else {
        nextBtn.textContent = '次へ';
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultScreen);
    scoreCountEl.textContent = score;
    totalCountEl.textContent = questionsData.length;

    // Update progress bar to full
    progressBarFill.style.width = '100%';

    const percentage = (score / questionsData.length) * 100;
    let message = '';

    if (percentage === 100) {
        message = '素晴らしい！全問正解！🎉 化学マスターですね！';
    } else if (percentage >= 80) {
        message = 'おしい！あと少しで満点です！👍';
    } else if (percentage >= 60) {
        message = '合格点！復習してさらに理解を深めましょう。📝';
    } else {
        message = 'まずは基本をしっかり復習しましょう！💪';
    }

    resultMessageEl.textContent = message;
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    // Optional: shuffle questions here if implemented
    showScreen(startScreen);
}

// Start the app
init();
