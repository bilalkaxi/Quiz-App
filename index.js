// Quiz App

const questions = [
    {
        question: "What is the most repeated Submit of the Quran?",
        answers: [
            {text: "Resurrection", correct:true},
            {text: "Prohets", correct:false},
            {text: " Skies and earth", correct:false},
            {text: " Angels ", correct:false},
        ]
    },
    {
        question: "How many Surahs are there in the Quran?",
        answers: [
            {text: "114", correct:true},
            {text: "144", correct:false},
            {text: "141", correct:false},
            {text: "113", correct:false},
        ]
    },
    {
        question: "Which Sin is the Eternaly Punishable",
        answers: [
            {text: "Adultery", correct:false},
            {text: "Killing", correct:false},
            {text: "Associating Partners", correct:true},
            {text: "Disobedience of Parents", correct:false},
        ]
    },
    {
        question: "What makes difference between Polytheism and Monotheism?",
        answers: [
            {text: "Charity", correct:false},
            {text: "Prayer", correct:true},
            {text: "Deeds", correct:false},
            {text: "Lying", correct:false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();