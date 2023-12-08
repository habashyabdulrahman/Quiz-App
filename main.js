const questions = [
  {
    question: 'What is the purpose of the "setTimeout" function in JavaScript?',
    answers: [
      {
        text: "To define a time delay before executing a function",
        correct: true,
      },
      {
        text: "To set an interval for recurring function execution",
        correct: false,
      },
      { text: "To create a countdown timer", correct: false },
      { text: "To measure the execution time of a function", correct: false },
    ],
  },
  {
    question: 'What is the role of the "localStorage" in JavaScript?',
    answers: [
      {
        text: "To store data permanently on the server",
        correct: false,
      },
      {
        text: "To store data temporarily on the client-side",
        correct: true,
      },
      { text: "To manage the browser's history", correct: false },
      { text: "To handle session data on the server", correct: false },
    ],
  },
  {
    question:
      "Which keyword is used to declare a constant variable in JavaScript?",
    answers: [
      {
        text: "var",
        correct: false,
      },
      {
        text: "let",
        correct: false,
      },
      { text: "const", correct: true },
      { text: "static", correct: false },
    ],
  },
  {
    question: 'What does the "NaN" value represent in JavaScript?',
    answers: [
      {
        text: "Not a Node",
        correct: false,
      },
      {
        text: "No Argument Null",
        correct: false,
      },
      { text: "Not a Number", correct: true },
      { text: "No Assignment Necessary", correct: false },
    ],
  },
  {
    question: 'What is the purpose of the "JSON.parse()" method in JavaScript?',
    answers: [
      {
        text: "To convert a JSON string into a JavaScript object",
        correct: true,
      },
      {
        text: "To stringify a JavaScript object into a JSON-formatted string",
        correct: false,
      },
      { text: "To check if a variable is of type JSON", correct: false },
      { text: "To parse HTML code into JSON format", correct: false },
    ],
  },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
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
    const button = document.createElement("button")
    button.innerHTML = answer.text
    button.classList.add("btn")
    answerButtons.appendChild(button)
    if (answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
  })
}

function resetState(){
  nextButton.style.display = "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === "true"
  if(isCorrect){
    selectedBtn.classList.add("correct")
    score++
  }else {
    selectedBtn.classList.add("incorrect")
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct")
    }
    button.disabled = true
  })
  nextButton.style.display = "block"
}

function showScore(){
  resetState()
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
  nextButton.innerHTML = "Play Again"
  nextButton.style.display = "block"
}

function handleNextButton(){
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length){
    showQuestion()
  }else{
    showScore()
  }
}

nextButton.addEventListener("click", ()=> {
  if (currentQuestionIndex < questions.length){
    handleNextButton()
  }else{
    startQuiz()
  }
})

startQuiz();