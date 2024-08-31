const questions = [{
        question: "Which is the largest animal in the world?",
        answers: [{
                tex: "Shark",
                correct: false
            },
            {
                tex: "Blue Whale",
                correct: true
            },
            {
                tex: "Giraffe",
                correct: false
            },
            {
                tex: "Elephant",
                correct: false
            }
        ]
    },
    {
        question: "Which is the Smallest Country in the world?",
        answers: [{
                tex: "Vatican City",
                correct: true
            },
            {
                tex: "Bhutan",
                correct: false
            },
            {
                tex: "Nepal",
                correct: false
            },
            {
                tex: "Sri Lanka",
                correct: false
            }
        ]
    },
    {
        question: "What is the largest lake in the world?",
        answers: [{
                tex: "Caspian Sea",
                correct: false
            },
            {
                tex: "Lake Superior",
                correct: false
            },
            {
                tex: "Ontario",
                correct: false
            },
            {
                tex: "Baikal",
                correct: true
            }
        ]
    },
    {
        question: "Which planet in the solar system is known as the 'Red Planet'?",
        answers: [{
                tex: "Earth",
                correct: false
            },
            {
                tex: "Mars",
                correct: false
            },
            {
                tex: "Jupiter",
                correct: false
            },
            {
                tex: "Venus",
                correct: true
            }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.tex;
        button.classList.add('btn');
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
