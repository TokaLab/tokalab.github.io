import { WORDS } from "./words.js";

let currentWord;
let score;
let attempts;
let hintsUsed;

const categoryEl = document.getElementById("category");
const maskedWordEl = document.getElementById("maskedWord");
const scoreEl = document.getElementById("score");
const attemptsEl = document.getElementById("attempts");
const messageEl = document.getElementById("message");
const hintListEl = document.getElementById("hintList");

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const hintBtn = document.getElementById("hintBtn");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  score = 100;
  attempts = 0;
  hintsUsed = 0;

  categoryEl.textContent = currentWord.category;
  maskedWordEl.textContent = "_ ".repeat(currentWord.answer.length);
  scoreEl.textContent = score;
  attemptsEl.textContent = attempts;
  messageEl.textContent = "";
  hintListEl.innerHTML = "";

  guessInput.value = "";
  restartBtn.classList.add("hidden");
}

function checkGuess() {
  const guess = guessInput.value.trim().toUpperCase();
  if (!guess) return;

  if (guess === currentWord.answer) {
    messageEl.textContent = "✅ Corretto! " + currentWord.explanation;
    restartBtn.classList.remove("hidden");
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    return;
  }

  attempts++;
  score -= 5;

  attemptsEl.textContent = attempts;
  scoreEl.textContent = score;
  messageEl.textContent = "❌ Non è corretto";

  guessInput.value = "";
}

function giveHint() {
  if (hintsUsed >= currentWord.hints.length) return;

  const hint = currentWord.hints[hintsUsed];
  const li = document.createElement("li");
  li.textContent = hint;
  hintListEl.appendChild(li);

  hintsUsed++;
  score -= 10;

  scoreEl.textContent = score;
}

guessBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", giveHint);
restartBtn.addEventListener("click", () => {
  guessBtn.disabled = false;
  hintBtn.disabled = false;
  startGame();
});

startGame();
