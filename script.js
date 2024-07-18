const questions = [
  {
    q: "What is the capital of India?",
    a: "New Delhi",
    opt: ["Jaipur", "Mumbai", "New Delhi", "Kolkata"],
    img: "/Image/question-mark.webp",
  },
  {
    q: "Which is the national bird of India?",
    a: "Peacock",
    opt: ["Sparrow", "Peacock", "Pigeon", "Crow"],
  },
  {
    q: "Who won the 2024 Cricket T20 World Cup?",
    a: "India",
    opt: ["Australia", "South Africa", "West Indies", "India"],
  },
  {
    q: "Who is the president of India?",
    a: "Draupadi Murmu",
    opt: ["APJ Abdul Kalam", "Narendra Modi", "Draupadi Murmu", "Rahul Gandhi"],
  },
];

const userAnswers = [];
const randomOrder = getARandomOrder();
const questionDiv = document.querySelector(".question");
const timerDiv = document.querySelector(".timer");
const quizDiv = document.querySelector("#quiz");
const scoreDiv = document.querySelector("#score");
const paragraphs = document.querySelectorAll(".option");
const optDiv = document.querySelector(".options");
const startButton = document.getElementById("startButton");
const nameInput = document.getElementById("nameInput");
const firstScreen = document.querySelector(".first_screen");

let timer = 5;
let count = 0;
let id1;
let id2;
let isQuestionAnswered = false;

timerDiv.innerHTML = timer;

startButton.addEventListener("click", () => {
  if (nameInput.value !== "") {
    firstScreen.style.display = "none";
    quizDiv.style.display = "block";
    startQuiz();
  } else {
    alert("Please enter your name");
  }
});

function startQuiz() {
  printQuestion();
  id2 = setInterval(() => {
    if (timer === 1) {
      timer = 5;
      timerDiv.innerHTML = timer;
    } else timerDiv.innerHTML = --timer;
  }, 1000);

  id1 = setInterval(() => {
    if (count === questions.length - 1) {
      checkUserAnswer();
      clearInterval(id1);
      clearInterval(id2);
      quizDiv.classList.add("hidden");
      scoreDiv.classList.remove("hidden");
      calculateScore();
    } else {
      count++;
      checkUserAnswer();
      enableAllOptions();
      printQuestion();
    }
  }, 5000);
}

function printQuestion() {
  const currentQuestion = questions[randomOrder[count]];
  questionDiv.innerHTML = `Q${count + 1}. ${currentQuestion.q}`;

  if (currentQuestion.img) {
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    img.alt = "Question Image";
    img.style.maxWidth = "100%";
    questionDiv.appendChild(img);
  }

  paragraphs.forEach((para, index) => {
    para.innerHTML = currentQuestion.opt[index];
  });
}

paragraphs.forEach((para) => {
  para.addEventListener("click", storeUserAnswer);
});

function storeUserAnswer(e) {
  isQuestionAnswered = true;
  userAnswers.push(e.target.innerHTML);
  disableAllOptions();
  console.log(userAnswers);
}

function checkUserAnswer() {
  if (isQuestionAnswered === false) {
    userAnswers.push(null);
    console.log(userAnswers);
  } else {
    isQuestionAnswered = false;
  }
}

function getARandomOrder() {
  let temp = [];
  for (let i = 0; i < questions.length; i++) {
    const randomValue = Math.floor(Math.random() * questions.length);
    if (temp.includes(randomValue)) return getARandomOrder();
    else {
      temp.push(randomValue);
    }
  }
  return temp;
}

function disableAllOptions() {
  paragraphs.forEach((para) => {
    para.classList.add("pointer-none");
  });
}

function enableAllOptions() {
  paragraphs.forEach((para) => {
    para.classList.remove("pointer-none");
  });
}

function calculateScore() {
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[randomOrder[index]].a) score++;
  });
  scoreDiv.innerHTML = `${nameInput.value} <br> <br> Your score is : ${score} out of ${questions.length}`;
}
