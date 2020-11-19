"use strict";

//#region DATABASE
// -------------------
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "First Question",
      answers: ["Correct1", "False", "False"],
      correctAnswers: "Correct1",
    },
    {
      question: "Second Question",
      answers: ["false", "Correct2", "False"],
      correctAnswers: "Correct2",
    },
    {
      question: "Third Question",
      answers: ["Correct3", "False", "False"],
      correctAnswers: "Correct3",
    },
    {
      question: "Fourth Question",
      answers: ["Correct4", "False", "False"],
      correctAnswers: "Correct4",
    },
    {
      question: "Fifth Question",
      answers: ["False", "False", "Correct5"],
      correctAnswers: "Correct5",
    },
    {
      question: "Sixth Question",
      answers: ["Correct6", "False", "False"],
      correctAnswers: "Correct6",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  introMessage: "lorem stuff and yea whatever",
  quizName: "Placeholder Name",
};

//#endregion

//#region CONTENT GENERATION
// -------------------
function titleSetter() {
  $("header h1").html(store.quizName);
}

function generateMainPage() {
  return `<div id="start-page">
  <p>${store.introMessage}</p>
  <button id="start">START</button>
  </div>`;
}

function generateLosePage() {
  return `<div id="lose-page">
  <h1>YOU LOSE</h1>
  <p>The correct answer was [${
    store.questions[store.questionNumber - 1].correctAnswers
  }]</p>
  <button class="restart">RESTART</button>
  <button class="continue">CONTINUE</button>
  </div>`;
}

function generateCorrectPage() {
  return `<div id="continue-page">
  <h1>CORRECT!!</h1>
  <button class="continue">CONTINUE</button>
  </div>`;
}

function generateWinPage() {
  return `<div id="win-page">
  <h1>QUIZ END</h1>
  <p>You correctly guessed ${store.score} out of ${store.questions.length} questions </p> 
  <button class="restart">RESTART</button>
  </div>`;
}

function generateQuestion() {
  let question = store.questions[store.questionNumber];

  let answerButtons = question.answers
    .map((answer) => new AnswerButton(answer).element)
    .join("");

  return `<div id="quiz-page">
  <h2>${question.question}</h2>
  <form id="question">
  ${answerButtons}
  <input type="submit"/>
  </form>
  <p>Question # ${store.questionNumber + 1}</p>
  </div>`;
}

//#endregion

//#region HANDLE EVENTS
// -------------------
function handleStartQuiz() {
  $("main").on("click", "#start", () => {
    store.quizStarted = true;
    $(render);
  });
}

function handleAnswerSubmit() {
  $("main").on("submit", "#question", (e) => {
    e.preventDefault();
    let answer = $('input[name = "answer"]:checked').val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswers;

    store.questionNumber++;

    if (answer === correctAnswer) {
      store.score++;
      render("correctPage");
    } else render("losePage");
  });
}

function handleEndScreen() {
  $("main").on("click", ".restart", (e) => {
    e.preventDefault();
    store.score = 0;
    store.questionNumber = 0;
    store.quizStarted = false;
    render("mainPage");
  });

  $("main").on("click", ".continue", (e) => {
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

function handleCorrectScreen() {
  $("main").on("click", ".continue", (e) => {
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

function handleLoseScreen() {
  $("main").on("click", ".restart", (e) => {
    e.preventDefault();
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

//#endregion

//#region RENDERING
// -------------------
function render(pagetype) {
  let html = "";

  switch (pagetype) {
    case "startPage":
      html = generateMainPage();
      break;
    case "endPage":
      html = generateWinPage();
      break;
    case "losePage":
      html = generateLosePage();
      break;
    case "correctPage":
      html = generateCorrectPage();
      break;
    default:
      html = generateQuestion();
  }

  $("main").html(html);
}

//#endregion

//#region HTML Objects
// -------------------
function AnswerButton(answer) {
  this.answer = answer;
  this.element = `<label>
  <input type="radio" class id="${answer}" name="answer" value="${answer}" required>${answer}</label>`;
}

//#endregion

function main() {
  $(titleSetter);
  $(handleStartQuiz);
  $(handleAnswerSubmit);
  $(handleEndScreen);
  $(handleCorrectScreen);
  render("startPage");
}
$(main); // Start after page loads
