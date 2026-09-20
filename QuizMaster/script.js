const quizData = {
  "General Knowledge": {
    icon: "🌍",
    description: "Test your everyday knowledge",
    questions: [
      { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"], answer: 1 },
      { q: "Which is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 2 },
      { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
      { q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
      { q: "What is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Peacock"], answer: 1 }
    ]
  },

  "Computer Science": {
    icon: "💻",
    description: "Computers, programming & technology",
    questions: [
      { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"], answer: 0 },
      { q: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "SQL"], answer: 1 },
      { q: "Which data structure follows FIFO?", options: ["Stack", "Tree", "Queue", "Graph"], answer: 2 },
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], answer: 0 },
      { q: "Which symbol is commonly used for a single-line comment in JavaScript?", options: ["##", "//", "<!--", "**"], answer: 1 }
    ]
  },

  "Mathematics": {
    icon: "📐",
    description: "Numbers, formulas & problem solving",
    questions: [
      { q: "What is 12 × 8?", options: ["86", "96", "108", "112"], answer: 1 },
      { q: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
      { q: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 },
      { q: "What is the value of π approximately?", options: ["2.14", "3.14", "4.14", "3.41"], answer: 1 },
      { q: "If x + 7 = 15, what is x?", options: ["6", "7", "8", "9"], answer: 2 }
    ]
  },

  "Science": {
    icon: "🔬",
    description: "Physics, chemistry & biology",
    questions: [
      { q: "What gas do plants mainly absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
      { q: "What is the chemical formula of water?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
      { q: "What force pulls objects toward Earth?", options: ["Friction", "Magnetism", "Gravity", "Pressure"], answer: 2 },
      { q: "Which organ pumps blood around the human body?", options: ["Lungs", "Brain", "Kidney", "Heart"], answer: 3 },
      { q: "At sea level, water normally boils at:", options: ["50°C", "75°C", "100°C", "120°C"], answer: 2 }
    ]
  },

  "English": {
    icon: "📚",
    description: "Grammar, vocabulary & language",
    questions: [
      { q: "Choose the synonym of 'Happy'.", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
      { q: "Which word is a noun?", options: ["Beautiful", "Quickly", "Teacher", "Run"], answer: 2 },
      { q: "Choose the correct sentence.", options: ["She go to college.", "She goes to college.", "She going college.", "She gone to college."], answer: 1 },
      { q: "What is the opposite of 'Ancient'?", options: ["Old", "Historic", "Modern", "Past"], answer: 2 },
      { q: "Which punctuation mark ends a direct question?", options: [".", ",", "!", "?"], answer: 3 }
    ]
  }
};

const topicScreen = document.getElementById("topicScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const topicGrid = document.getElementById("topicGrid");
const topicName = document.getElementById("topicName");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const liveScore = document.getElementById("liveScore");
const finalScore = document.getElementById("finalScore");
const totalQuestions = document.getElementById("totalQuestions");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const retryBtn = document.getElementById("retryBtn");
const chooseBtn = document.getElementById("chooseBtn");
const homeBtn = document.getElementById("homeBtn");

let currentTopic = "";
let currentQuestion = 0;
let score = 0;
let selected = false;

function showScreen(screen) {
  [topicScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
  homeBtn.classList.toggle("hidden", screen === topicScreen);
}

function createTopics() {
  topicGrid.innerHTML = "";
  Object.entries(quizData).forEach(([name, data]) => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <div class="topic-icon">${data.icon}</div>
      <h3>${name}</h3>
      <p>${data.description}</p>
      <p>${data.questions.length} questions</p>
    `;
    card.addEventListener("click", () => startQuiz(name));
    topicGrid.appendChild(card);
  });
}

function startQuiz(topic) {
  currentTopic = topic;
  currentQuestion = 0;
  score = 0;
  liveScore.textContent = score;
  topicName.textContent = topic;
  showScreen(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  selected = false;
  const questions = quizData[currentTopic].questions;
  const item = questions[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.q;
  progressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;
  optionsBox.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question";

  item.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(index, clickedButton) {
  if (selected) return;
  selected = true;

  const item = quizData[currentTopic].questions[currentQuestion];
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(btn => btn.disabled = true);
  clickedButton.classList.add("selected");

  if (index === item.answer) {
    score++;
    clickedButton.classList.add("correct");
  } else {
    clickedButton.classList.add("wrong");
    allOptions[item.answer].classList.add("correct");
  }

  liveScore.textContent = score;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  const questions = quizData[currentTopic].questions;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  const total = quizData[currentTopic].questions.length;
  const percent = Math.round((score / total) * 100);

  finalScore.textContent = score;
  totalQuestions.textContent = `/ ${total}`;
  percentage.textContent = `${percent}%`;

  if (percent === 100) {
    resultMessage.textContent = "Perfect score! Excellent work!";
  } else if (percent >= 70) {
    resultMessage.textContent = "Great job! Keep learning!";
  } else if (percent >= 50) {
    resultMessage.textContent = "Good effort! A little more practice will help.";
  } else {
    resultMessage.textContent = "Keep practicing and try again!";
  }

  progressBar.style.width = "100%";
  showScreen(resultScreen);
}

retryBtn.addEventListener("click", () => startQuiz(currentTopic));
chooseBtn.addEventListener("click", () => showScreen(topicScreen));
homeBtn.addEventListener("click", () => showScreen(topicScreen));

createTopics();
