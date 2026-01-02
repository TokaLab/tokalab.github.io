import { WORDS } from "./words.js";

/* =========================
   IDENTITÀ GIOCATORE
========================= */

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

/* =========================
   DATA
========================= */

const SUPABASE_URL = "https://tvrnrbssryivvozgejmx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cm5yYnNzcnlpdnZvemdlam14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzE4MTUsImV4cCI6MjA4Mjk0NzgxNX0.XEm1aW3wgwD-iaUMSrhN9N3AM1oF3o4ae5-k9zGJkaI";


/* =========================
   DATA
========================= */

const today = new Date().toISOString().slice(0, 10);

/* =========================
   STATO DI GIOCO
========================= */

let currentWord;
let score;
let attempts;
let hintsUsed;
let gameEnded = false;

/* =========================
   ELEMENTI DOM
========================= */

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

/* =========================
   PAROLA DEL GIORNO
========================= */

function getWordOfTheDay() {
  const start = new Date("2024-01-01");
  const now = new Date();
  const diffDays = Math.floor((now - start) / 86400000);
  return WORDS[diffDays % WORDS.length];
}

/* =========================
   AVVIO GIOCO
========================= */

function startGame() {
  const playedToday = localStorage.getItem("playedToday");

  if (playedToday === today) {
    lockGame();
    return;
  }

  currentWord = getWordOfTheDay();
  score = 100;
  attempts = 0;
  hintsUsed = 0;
  gameEnded = false;

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

/* =========================
   BLOCCO GIORNALIERO
========================= */

function lockGame() {
  currentWord = getWordOfTheDay();

  categoryEl.textContent = currentWord.category;
  maskedWordEl.textContent = currentWord.answer.split("").join(" ");
  messageEl.textContent =
    "⏳ Hai già giocato oggi. Torna domani per una nuova parola!";

  guessInput.disabled = true;
  guessBtn.disabled = true;
  hintBtn.disabled = true;
  restartBtn.classList.add("hidden");
}

/* =========================
   CONTROLLO RISPOSTA
========================= */

function checkGuess() {
  if (gameEnded) return;

  const guess = guessInput.value.trim().toUpperCase();
  if (!guess) return;

  if (guess === currentWord.answer) {
    endGame(true);
    return;
  }

  attempts++;
  score = Math.max(0, score - 5);

  attemptsEl.textContent = attempts;
  scoreEl.textContent = score;
  messageEl.textContent = "❌ Non è corretto";

  guessInput.value = "";
}

/* =========================
   SUGGERIMENTI
========================= */

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

/* =========================
   FINE PARTITA
========================= */

function endGame(success) {
  gameEnded = true;
  localStorage.setItem("playedToday", today);

  guessInput.disabled = true;
  guessBtn.disabled = true;
  hintBtn.disabled = true;

  if (success) {
    messageEl.textContent =
      `✅ Corretto! ${currentWord.explanation}`;
  } else {
    messageEl.textContent =
      `❌ La parola era ${currentWord.answer}`;
  }

  // QUI più avanti:
  // invio punteggio a Supabase
  sendScore();

  loadLeaderboard();
}

async function sendScore() {
  if (!playerId || !nickname || score == null) {
    console.warn("Dati non validi, skip invio", { playerId, nickname, score });
    return;
  }

  const payload = {
    player_id: String(playerId),
    nickname: String(nickname),
    score: Number(score),
    date: today // dovrebbe essere "YYYY-MM-DD"
  };

  console.log("Sto inviando score", payload);

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

    console.log("Response status:", res.status);

    if (!res.ok) {
      console.warn("Score già inviato o errore", await res.text());
    }
  } catch (err) {
    console.error("Errore invio score", err);
  }
}

async function loadLeaderboard() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/scores?select=nickname,score,date&date=eq.${today}&order=score.desc&limit=10`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn("Errore caricamento classifica", text);
      leaderboardList.innerHTML = "<li>Errore nel caricamento</li>";
      showLeaderboardBtn.classList.remove("hidden");
      return;
    }

    const data = await res.json();
    leaderboardList.innerHTML = "";

    if (data.length === 0) {
      leaderboardList.innerHTML = "<li>Nessun punteggio oggi</li>";
    } else {
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.nickname}: ${entry.score}`;
        leaderboardList.appendChild(li);
      });
    }

    // Mostra il pulsante sempre, anche se non ci sono punteggi
    showLeaderboardBtn.classList.remove("hidden");

  } catch (err) {
    console.error("Errore loadLeaderboard", err);
    leaderboardList.innerHTML = "<li>Errore nel caricamento</li>";
    showLeaderboardBtn.classList.remove("hidden");
  }
}


/* =========================
   EVENTI
========================= */

guessBtn.addEventListener("click", checkGuess);
hintBtn.addEventListener("click", giveHint);

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

/* =========================
   START
========================= */

startGame();

// ELEMENTI MODALE
const leaderboardModal = document.getElementById("leaderboardModal");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const showLeaderboardBtn = document.getElementById("showLeaderboardBtn");

// APRI modale
showLeaderboardBtn.addEventListener("click", () => {
  leaderboardModal.classList.remove("hidden");
});

// CHIUDI modale
closeLeaderboard.addEventListener("click", () => {
  leaderboardModal.classList.add("hidden");
});