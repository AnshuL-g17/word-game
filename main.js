window.addEventListener('load', init);

// Levels based on score
const levels = {
  easy: { time: 6, words: [] },
  medium: { time: 4, words: [] },
  hard: { time: 3, words: [] },
  insane: { time: 2, words: [] }
};

let time = 6;
let score = 0;
let isPlaying = false;
let currentLevel = "easy";

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Word banks
levels.easy.words = [
  'hat','cat','dog','run','sun','book','pen','cup','tree','ball'
];

levels.medium.words = [
  'river','lucky','hero','magic','space','master','echo','joke','happy','smart'
];

levels.hard.words = [
  'developer','javascript','nutrition','revolver','siblings','investigate','symptom'
];

levels.insane.words = [
  'establishment','horrendous','extraordinary','communication','transformation','responsibility'
];

function init() {
  updateLevel();
  showWord();
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

function updateLevel() {
  if (score >= 30) currentLevel = "insane";
  else if (score >= 20) currentLevel = "hard";
  else if (score >= 10) currentLevel = "medium";
  else currentLevel = "easy";

  time = levels[currentLevel].time;
  seconds.innerHTML = time;
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;

    updateLevel(); // 🔥 update difficulty
    time = levels[currentLevel].time + 1;

    showWord();
    wordInput.value = '';
    score++;
  }

  scoreDisplay.innerHTML = score < 0 ? 0 : score;
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

function showWord() {
  const words = levels[currentLevel].words;
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function countdown() {
  if (time > 0) {
    time--;
  } else {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!';
    score = 0;
  }
}
