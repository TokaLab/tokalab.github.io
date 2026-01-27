let forbiddenData = null;
let allCards = []; 
let deck = [];
let discarded = [];
let enabledModes = [];

// ELEMENTI DOM
const cardEl = document.getElementById("card");
const imageEl = document.getElementById("cardImage");
const wordEl = document.getElementById("word");
const descriptionEl = document.getElementById("description");
const forbiddenListEl = document.getElementById("forbiddenList");
const startButton = document.getElementById("startButton");
const modeSelector = document.getElementById("modeSelector");
const drawButton = document.getElementById("drawButton");

// Upload JSON data
fetch("data/cards.json?t=" + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    allCards = data.cards; 
    console.log("Cards loaded:", allCards);
  })
  .catch(error => {
    console.error("Errore nel caricare cards.json", error);
  });

// Select modes and start game
startButton.addEventListener("click", () => {
  console.log("Start button clicked");
  const checked = document.querySelectorAll(
    '#modeSelector input[type="checkbox"]:checked'
  );

  enabledModes = [...checked].map(cb => cb.value);

  if (enabledModes.length === 0) {
    alert("Select at least one mode!");
    return;
  }

  startGame();

  modeSelector.style.display = "none";
  startButton.style.display = "none";
  cardEl.style.display = "block";
  drawButton.style.display = "inline-block";

  drawCard();
});

drawButton.addEventListener("click", () => {
  drawCard();
});

function startGame() {
  deck = [...allCards]; // tutte le carte sono disponibili
  discarded = [];
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCard() {
  if (deck.length === 0) {
    deck = [...discarded];
    discarded = [];
    shuffle(deck);
  }

  const mode = enabledModes[Math.floor(Math.random() * enabledModes.length)];

  // estrazione casuale
  const idx = Math.floor(Math.random() * deck.length);
  const card = deck.splice(idx, 1)[0]; 
  discarded.push(card);

  applyCard(card, mode);
}

function applyCard(card, mode) {
  cardEl.className = "";
  cardEl.classList.add(`mode-${mode.toLowerCase()}`);

  imageEl.src = `images/${mode.toLowerCase()}.png`;

  wordEl.textContent = card.word;
  descriptionEl.textContent = card.description;
  
  // Mostra forbidden sempre se esiste
 
  if (card.forbidden?.length > 0) {
    forbiddenListEl.innerHTML = "";
    card.forbidden.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      forbiddenListEl.appendChild(li);
    });
  }
  else {
    forbiddenListEl.style.display = "none";
  }
}
