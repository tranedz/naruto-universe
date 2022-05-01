const quiz_questions = [
  // QUESTION ONE
  {
    question: "What technique does Sasuke use?",
    correctAnswer: "Chidori",
    answers: ["Chidori", "Rasengan"],
    img: {
      src: "https://assets.puzzlefactory.pl/puzzle/367/572/original.jpg",
      altText: "Sasuke",
      bgColor: "#49a4eb",
    },
  },
  // QUESTION TWO
  {
    question: "Which ninja technique does Naruto use?",
    correctAnswer: "Multicloning",
    answers: ["Multicloning", "SexyJutsu"],
    img: {
      src: "https://i.pinimg.com/originals/a3/9c/76/a39c766200692e357cfc7e797dd54897.jpg",
      altText: "Naruto",
      bgColor: "#8eaab8",
    },
  }
]

let userScore = document.querySelector('#user-score');

const totalQuestions = quiz_questions.length;

// let gameStatus;
let currentQuestion, questionTitle, correctAnswer, questionsArray,
  imageArray, score, totalScore;

currentQuestion = 0;

score = 0;
userScore.innerHTML = score;

console.log(`Your score is ${score}.`);

// ------------------------------
function startGame(quiz_questions, currentQuestion) {

  questionTitle = quiz_questions[currentQuestion].question;
  correctAnswer = quiz_questions[currentQuestion].correctAnswer;
  questionsArray = quiz_questions[currentQuestion].answers;
  imageArray = quiz_questions[currentQuestion].img;

  //  QUESTION CREATION
  
  let outputMessage = document.createElement("h4");
  outputMessage.id = "output-question";
  outputMessage.innerHTML = questionTitle;
  document.querySelector("#question-output-container").appendChild(outputMessage);

  // IMAGE CREATION

  let image = document.createElement("img");
  image.setAttribute("src", imageArray["src"]);
  image.setAttribute("alt", imageArray["altText"]);
  image.id = "imageQuestion";
  document.querySelector("#image-container").appendChild(image);
  document.querySelector(".wrapper").style.backgroundColor = imageArray["bgColor"];

  //  LABEL AND INPUT CREATION

  for (let i = 0; i < questionsArray.length; i++) {

    const element = questionsArray[i];
    // LABEL
    let label = document.createElement("label");
    label.appendChild(document.createTextNode(element));
    label.setAttribute("for", element);
    label.className = "list-label";

    // INPUT
    input = document.createElement("input");
    input.setAttribute("value", element);
    input.setAttribute("type", "radio");
    input.setAttribute("name", "choice");
    input.id = element;

    label.appendChild(input);
    document.querySelector("#answers-container").appendChild(label);

  }

  // BUTTON CONFIRM
  let buttonConfirm = document.createElement('button');
  buttonConfirm.textContent = "Confirm";
  buttonConfirm.id = "btnConfirm";

  document.querySelector('.btn-container').appendChild(buttonConfirm);


  // CONFIRMATION OF CHOICE
  quizContainerForm = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    currentQuestion++;
    let answered = e.target.querySelector('input[name=choice]:checked').value;
    const isCorrectAnswer = answered === correctAnswer;

    if (isCorrectAnswer) {
      score = score + 1;
      userScore.innerHTML = score;
      console.log(`Good response! Your score is ${score}.`);

      resetElements();

      startGame(quiz_questions, currentQuestion);

    }
    if (!isCorrectAnswer) {
      score = score + 0;
      console.log(`Bad response. Your score is ${score}.`);

      resetElements();
      startGame(quiz_questions, currentQuestion);
    }

    if (currentQuestion === quiz_questions.length) {
      alert('finished');
      return;
    };
  });

  /** ------ MY PROBLEM ---------- */
  function resetElements() {
    // Problem while executing the removeChild();
    document.querySelector("#question-output-container").removeChild(outputMessage);
    document.querySelector("#image-container").removeChild(image);
    document.querySelector(".btn-container").removeChild(buttonConfirm);

    let listLabel = document.querySelectorAll('.list-label');

    for (let j = 0; j < listLabel.length; j++) {
      document.querySelector('#answers-container').removeChild(listLabel[j]);

    }

  }
  /** ------ END OF MY PROBLEM ---------- */
};
startGame(quiz_questions, currentQuestion);
