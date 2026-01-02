import { WORDS } from "./words.js";

let playerId = localStorage.getItem("playerId");
let nickname = localStorage.getItem("nickname");

if (!playerId) {
  playerId = crypto.randomUUID();
  localStorage.setItem("playerId", playerId);
}

if (!nickname) {
  nickname = prompt("Scegli un nickname");
  localStorage.setItem("nickname", nickname);
}

const SUPABASE_URL = "https://tvrnrbssryivvozgejmx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cm5yYnNzcnlpdnZvemdlam14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzE4MTUsImV4cCI6MjA4Mjk0NzgxNX0.XEm1aW3wgwD-iaUMSrhN9N3AM1oF3o4ae5-k9zGJkaI";

const today = new Date().toISOString().slice(0, 10);

let currentWord, score, attempts, hintsUsed, gameEnded = false;

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

const leaderboardModal = document.getElementById("leaderboardModal");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const showLeaderboardBtn = document.getElementById("showLeaderboardBtn");

function getWordOfTheDay() {
  const start = new Date("2024-01-01");
  const now = new Date();
  const diffDays = Math.floor((now - start) / 86400000);
  return WORDS[diffDays % WORDS.length];
}

function startGame() {
  const playedToday = localStorage.getItem("playedToday");
  if (playedToday === today) lockGame();
  currentWord = getWordOfTheDay();
  score = 100; attempts = 0; hintsUsed = 0; gameEnded = false;
  categoryEl.textContent = currentWord.category;
  maskedWordEl.textContent = "_ ".repeat(currentWord.answer.length);
  scoreEl.textContent = score;
  attemptsEl.textContent = attempts;
  messageEl.textContent = "";
  hintListEl.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  hintBtn.disabled = false;
  restartBtn.classList.add("hidden");
}

function lockGame() {
  currentWord = getWordOfTheDay();
  categoryEl.textContent = currentWord.category;
  maskedWordEl.textContent = currentWord.answer.split("").join(" ");
  messageEl.textContent = "⏳ Hai già giocato oggi. Torna domani!";
  guessInput.disabled = true;
  guessBtn.disabled = true;
  hintBtn.disabled = true;
  restartBtn.classList.add("hidden");
}

function checkGuess() {
  if (gameEnded) return;
  const guess = guessInput.value.trim().toUpperCase();
  if (!guess) return;
  if (guess === currentWord.answer) { endGame(true); return; }
  attempts++; score = Math.max(0, score - 5);
  attemptsEl.textContent = attempts;
  scoreEl.textContent = score;
  messageEl.textContent = "❌ Non è corretto";
  guessInput.value = "";
}

function giveHint() {
  if (gameEnded) return;
  if (hintsUsed >= currentWord.hints.length) return;
  const hint = currentWord.hints[hintsUsed];
  const li = document.createElement("li");
  li.textContent = hint;
  hintListEl.appendChild(li);
  hintsUsed++;
  score = Math.max(0, score - 10);
  scoreEl.textContent = score;
}

function endGame(success) {
  gameEnded = true;
  localStorage.setItem("playedToday", today);
  guessInput.disabled = true; guessBtn.disabled = true; hintBtn.disabled = true;
  messageEl.textContent = success ? `✅ Corretto! ${currentWord.explanation}` : `❌ La parola era ${currentWord.answer}`;
  sendScore();
  loadLeaderboard();
}

async function sendScore() {
  if (!playerId || !nickname || score == null) return;
  const payload = { player_id: playerId, nickname, score, date: today };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) { console.error("Errore invio score", err); }
}

async function loadLeaderboard() {
  try {
    const todayDate = new Date().toISOString().slice(0, 10);

    // Prendi tutti i punteggi (o almeno gli ultimi 100)
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/scores?select=nickname,score,date&order=score.desc&limit=100`,
      {
        method: "GET",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.warn("Errore caricamento classifica", text);
      leaderboardList.innerHTML = "<li>Errore nel caricamento</li>";
      showLeaderboardBtn.classList.remove("hidden");
      return;
    }

    const data = await res.json();

    // Filtra solo i punteggi di oggi
    const todayScores = data.filter(entry => entry.date.startsWith(todayDate));

    leaderboardList.innerHTML = "";

    if (todayScores.length === 0) {
      leaderboardList.innerHTML = "<li>Nessun punteggio oggi aggiornato</li>";
    } else {
      todayScores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.nickname}: ${entry.score}`;
        leaderboardList.appendChild(li);
      });
    }

    showLeaderboardBtn.classList.remove("hidden");

  } catch (err) {
    console.error("Errore loadLeaderboard", err);
    leaderboardList.innerHTML = "<li>Errore nel caricamento</li>";
    showLeaderboardBtn.classList.remove("hidden");
  }
}

// Eventi
guessBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", giveHint);
guessInput.addEventListener("keydown", e => { if(e.key==="Enter") checkGuess(); });
showLeaderboardBtn.addEventListener("click", ()=> leaderboardModal.classList.remove("hidden"));
closeLeaderboard.addEventListener("click", ()=> leaderboardModal.classList.add("hidden"));

// Start
startGame();
loadLeaderboard(); // leaderboard visibile anche se hai già giocato
