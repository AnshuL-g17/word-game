window.addEventListener('load', init);

// LEVELS + HUGE WORD BANK
const levels = {
  easy: {
    time: 6,
    words: [
      'cat','dog','sun','pen','cup','hat','ball','tree','fish','milk',
      'road','star','blue','green','book','chair','table','phone','glass','clock',
      'plant','stone','bread','water','light','mouse','paper','shirt','shoe','bag',
      'ring','leaf','fire','snow','rain','wind','dust','salt','sugar','coin',
      'box','key','lock','wall','door','floor','roof','hill','lake','river',
      'bird','goat','lion','tiger','zebra','horse','sheep','camel','frog','snake',
      'apple','mango','grape','peach','berry','lemon','melon','guava','plum','pear'
    ]
  },

  medium: {
    time: 4,
    words: [
      'river','market','planet','silver','yellow','button','window','pencil','laptop','mobile',
      'garden','forest','desert','island','camera','pillow','basket','orange','purple','guitar',
      'engine','rocket','travel','screen','mirror','cookie','bottle','hammer','driver','pocket',
      'energy','signal','motion','system','object','design','circle','square','random','future',
      'memory','charge','credit','filter','search','update','delete','insert','select',
      'school','college','office','clinic','temple','mosque','church','station','airport',
      'artist','writer','singer','player','doctor','lawyer','teacher','farmer','builder'
    ]
  },

  hard: {
    time: 3,
    words: [
      'developer','javascript','computer','keyboard','internet','software','hardware','database',
      'algorithm','function','variable','framework','compiler','debugging','encryption','network',
      'processor','application','interface','protocol','iteration','recursion','optimization',
      'authentication','authorization','synchronization','configuration','integration','deployment',
      'architecture','microservice','containerization','virtualization','orchestration',
      'performance','scalability','availability','consistency','throughput','latency',
      'refactoring','abstraction','encapsulation','inheritance','polymorphism',
      'multithreading','asynchronous','scheduling','execution','dependency'
    ]
  },

  insane: {
    time: 2,
    words: [
      'extraordinary','communication','transformation','responsibility','misinterpretation',
      'internationalization','hyperconnectivity','characterization','implementation',
      'multidimensional','decentralization','microarchitecture','electromagnetism',
      'thermodynamics','neuroplasticity','cryptocurrency','institutionalization',
      'counterproductive','hyperparameterization','interoperability',
      'counterintuitive','electroencephalogram','psychophysiological',
      'microminiaturization','spectrophotometry','hyperresponsiveness',
      'counterrevolutionary','overintellectualization','transubstantiation',
      'interdisciplinary','hyperventilation','characteristically','unconstitutionality'
    ]
  }
};

let time = 6;
let score = 0;
let isPlaying = false;
let currentLevel = "easy";
let usedWords = [];

// DOM
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const levelDisplay = document.querySelector('#level');

// INIT
function init() {
  updateLevel();
  showWord();
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

// LEVEL SYSTEM
function updateLevel() {
  if (score >= 30) currentLevel = "insane";
  else if (score >= 20) currentLevel = "hard";
  else if (score >= 10) currentLevel = "medium";
  else currentLevel = "easy";

  time = levels[currentLevel].time;
  seconds.innerHTML = time;
  levelDisplay.innerHTML = currentLevel.toUpperCase();
}

// MATCH
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    score++;

    updateLevel();
    time = levels[currentLevel].time + 1;

    showWord();
    wordInput.value = '';
  }

  scoreDisplay.innerHTML = score < 0 ? 0 : score;
}

// CHECK MATCH
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// NO REPEAT WORD SYSTEM
function showWord() {
  let words = levels[currentLevel].words.filter(word => !usedWords.includes(word));

  if (words.length === 0) {
    message.innerHTML = "🎉 You finished all words!";
    isPlaying = false;
    return;
  }

  const randIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[randIndex];

  currentWord.innerHTML = selectedWord;
  usedWords.push(selectedWord);
}

// TIMER
function countdown() {
  if (time > 0) {
    time--;
  } else {
    isPlaying = false;
  }

  timeDisplay.innerHTML = time;
}

// GAME STATUS
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!';
    score = 0;
    usedWords = [];
  }
}
