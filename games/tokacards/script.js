let forbiddenData = null;

// ELEMENTI DOM
const cardEl = document.getElementById("card");
const imageEl = document.getElementById("cardImage");
const wordEl = document.getElementById("word");
const descriptionEl = document.getElementById("description");
const forbiddenListEl = document.getElementById("forbiddenList");
const button = document.getElementById("drawButton");

// CARICAMENTO JSON
fetch("data/forbidden.json?t=" + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    forbiddenData = data;
    console.log("Forbidden loaded:", forbiddenData);
  })
  .catch(error => {
    console.error("Errore nel caricare forbidden.json", error);
  });

// PESCA CARTA
button.addEventListener("click", () => {
  if (!forbiddenData) return;

  const cards = forbiddenData.cards;
  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  // Imposta modalità e template
  cardEl.className = "mode-forbidden";
  imageEl.src = forbiddenData.template;

  // Testi
  wordEl.textContent = card.word;
  descriptionEl.textContent = card.description;

  // Lista forbidden
  forbiddenListEl.innerHTML = "";
  card.forbidden.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    forbiddenListEl.appendChild(li);
  });
});

