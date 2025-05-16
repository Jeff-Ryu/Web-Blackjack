// Globals
const cards = [
    "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮", // Spades 0 ~ 12
    "🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾", // Hearts 13 ~ 25
    "🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎", // Diamonds 26 ~ 38
    "🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"  // Clovers 39 ~ 51
]
const setArr = [1,2,3,4,5,6,7,8,9,10,10,10,10];
const deck = Array(52).fill(null).map((_, i) => ({
    card: cards[i],
    val: setArr[i % 13],
    used: 0
}));

let playerHand = [];
let houseHand = [];
let active = 0;
let turn = 0;

// On Load
window.addEventListener("DOMContentLoaded", () => {
    reset();
    countHand();
});

function reset() {
    playerHand = [];
    houseHand = [];
    active = 1;

    document.querySelectorAll(".card").forEach(card => {
        card.remove();
    });

    addCard(0, 2);
    addCard(1, 2);
    addCard(9, 1);
    countHand();
}

function hit() {
    if (active === 0) return;
    addCard(1,1);
    countHand();
}

function addCard(player, j) {
    for (let i = 0; i < j; i++) {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
    
        let r = Math.floor(Math.random() * 52);
        newCard.innerText = deck[r].card;
    
        if (player == 0) {
            document.getElementById("house-row").appendChild(newCard);
            houseHand.push(deck[r].val);
        } else if (player == 1) {
            document.getElementById("player-row").appendChild(newCard);
            playerHand.push(deck[r].val);
        } else if (player == 9) {
            document.getElementById("mid-row").appendChild(newCard);
            newCard.innerText = "🂠";
            newCard.id = "deck";
        }
    }
}

function countHand() {
    const total = playerHand.reduce((sum, val) => sum + val, 0);
    const text = document.getElementById("stats-text");
    text.innerHTML = total;

    blackJack(text, total);
}

function blackJack(text, total) {
    if (total > 21) {
        text.innerHTML = "BUST " + "(" + total + ")"
    } else if (total == 21) {
        text.innerHTML = "BLACKJACK"
    } else return;
}