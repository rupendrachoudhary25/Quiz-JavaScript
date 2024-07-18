const questions = [
  {
    q: "What is the capital of India?",
    a: "New Delhi",
    opt: ["Jaipur", "Mumbai", "New Delhi", "Kolkata"],
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

let timer = 5;
let count = 0;
let id1;
let id2;
let isQuestionAnswered = false;

timerDiv.innerHTML = timer;

// Print the first question instantly on page load
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
    // clear the question
    clearInterval(id1);
    // clear the timer
    clearInterval(id2);
    quizDiv.classList.add("hidden");
    optDiv.classList.add("hidden");
    scoreDiv.classList.remove("hidden");
    calculateScore();
  } else {
    // incerment the question number
    count++;
    //to check all questions except the last one
    checkUserAnswer();
    //Enable all options again
    enableAllOptions();
    // Question change
    printQuestion();
  }
}, 5000);

function printQuestion() {
  // questionDiv.innerHTML = questions[count].q;
  // questionDiv.innerHTML = `Q${count + 1}. ${questions[count].q}`;
  questionDiv.innerHTML = `Q${count + 1}. ${questions[randomOrder[count]].q}`;
  paragraphs.forEach((para, index) => {
    // para.innerHTML = questions[count].opt[index];
    para.innerHTML = questions[randomOrder[count]].opt[index];
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
    const randomvalue = Math.floor(Math.random() * questions.length);
    if (temp.includes(randomvalue)) return getARandomOrder();
    else {
      temp.push(randomvalue);
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
    // if (answer === questions[index].a)
    if (answer === questions[randomOrder[index]].a) score++;
  });
  scoreDiv.innerHTML = `Your score is: ${score} out of ${questions.length}`;
}
