const menu = document.querySelector(".menuToggler");
const drop = document.querySelector(".dropdown");
let menuopen = false;
menu.addEventListener("click", () => {
  console.log("click");
  if (!menuopen) {
    menu.classList.add("open");
    drop.classList.add("open");
    menuopen = true;
  } else {
    menu.classList.remove("open");
    drop.classList.remove("open");
    menuopen = false;
  }
});

const quizQuestions = [
  {
    question: "Who played the role of Iron Man?",
    optionA: "Rober Downey Jr.",
    optionB: "Christian Bale",
    optionC: "Tom Cruise",
    optionD: "Benedict Cumberbatch",
    correct: "optionA",
  },
  {
    question: "Who played the role of Captain America?",
    optionA: "Rober Downey Jr.",
    optionB: "Chris Evans",
    optionC: "Tom Cruise",
    optionD: "Benedict Cumberbatch",
    correct: "optionB",
  },
  {
    question: "Who was responsible for King T’Chaka’s death?",
    optionA: "Zemo",
    optionB: "Steve Rogers",
    optionC: "Bucky Barnes",
    optionD: "Black Widow",
    correct: "optionA",
  },
  {
    question: "Pepper Potts is allergic to what?",
    optionA: "Blueberries",
    optionB: "Strawberries",
    optionC: "Kiwi",
    optionD: "Apple",
    correct: "optionB",
  },
  {
    question: "Who said this first, 'Peace in our time'?",
    optionA: "Ultron",
    optionB: "Bruce Banner",
    optionC: "Tony Stark",
    optionD: "Jarvis",
    correct: "optionC",
  },
];

const displayQuestion = document.querySelector("#question");
const displayOptionA = document.getElementById("Aoption");
const displayOptionB = document.getElementById("Boption");
const displayOptionC = document.getElementById("Coption");
const displayOptionD = document.getElementById("Doption");
const allAnswers = document.querySelectorAll(".answer");
const submitBtn = document.getElementById("submit");
let quizContainer = document.getElementsByClassName("results");

let questionNumber = 0;
let score = 0;

start();

function start() {
  initialUnselect();
  const eachQuestion = quizQuestions[questionNumber];

  displayQuestion.innerText = eachQuestion.question;
  displayOptionA.innerText = eachQuestion.optionA;
  displayOptionB.innerText = eachQuestion.optionB;
  displayOptionC.innerText = eachQuestion.optionC;
  displayOptionD.innerText = eachQuestion.optionD;
}

function initialUnselect() {
  allAnswers.forEach((item) => (item.checked = false));
}

const getSelectedAnswers = () => {
  let answer;
  allAnswers.forEach((item) => {
    if (item.checked) {
      answer = item.id;
    }
  });

  return answer;
};

submitBtn.addEventListener("click", () => {
  const answer = getSelectedAnswers();

  if (answer) {
    if (answer == quizQuestions[questionNumber].correct) {
      score++;
    }
    questionNumber++;
  }
  if (questionNumber < quizQuestions.length) {
    start();
  } else {
    document.querySelector(".results").insertAdjacentHTML(
      "afterbegin",
      `<h2>You got ${score} out of ${quizQuestions.length} questions correctly.</h2>
    `,
    );
    submitBtn.disabled = true;
  }
});
