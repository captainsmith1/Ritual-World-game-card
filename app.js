let firstSymbol = null;
let secondSymbol = null;

let score = 0;
const scoreDisplay = document.getElementById("score");

const winMessage = document.getElementById("winMessage");
let matchedPairs = 0;
const game = document.getElementById("game");

const symbols = [
    "img1.png.png",
    "img2.png.png",
    "img3.png.png",
    "img4.png.jpg",
    "img5.png.png",
    "img6.png.jpg",
    "img7.png",
    "img8.png"
];

let cards = [...symbols, ...symbols];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// 🔀 shuffle
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// 🎴 create board
function createBoard() {
    game.innerHTML = "";

    shuffle(cards).forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${symbol}" class="card-image">
                </div>
            </div>
        `;

        card.addEventListener("click", () => flipCard(card, symbol));
        game.appendChild(card);
    });
}

// 🃏 flip logic
function flipCard(card, symbol) {
    if (lockBoard || card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        firstSymbol = symbol;
        return;
    }

    secondCard = card;
    secondSymbol = symbol;
    lockBoard = true;

    checkMatch();
}

// ✅ match check
function checkMatch() {
    if (firstSymbol === secondSymbol) {
        matchedPairs++;
        score += 10;

        updateScore();

        if (matchedPairs === symbols.length) {
            showWinEffect();
        }

        resetTurn();

    } else {
        score = Math.max(0, score - 2);

        updateScore();

        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetTurn();
        }, 800);
    }
}

// 🔄 RESET TURN (🔥 MAIN FIX)
function resetTurn() {
    firstCard = null;
    secondCard = null;
    firstSymbol = null;
    secondSymbol = null;
    lockBoard = false;
}

// 📊 score update
function updateScore() {
    scoreDisplay.textContent = score;
}

// 🎉 win effect
function showWinEffect() {
    winMessage.style.display = "block";

    document.getElementById("game").classList.add("blur");
    document.getElementById("scoreBox").classList.add("blur");

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 70,
            origin: { y: 0.6 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// 🔄 restart
function restartGame() {
    firstCard = null;
    secondCard = null;
    firstSymbol = null;
    secondSymbol = null;
    lockBoard = false;

    matchedPairs = 0;
    score = 0;

    updateScore();

    winMessage.style.display = "none";

    document.getElementById("game").classList.remove("blur");
    document.getElementById("scoreBox").classList.remove("blur");

    createBoard();
}

// 🏠 home
function goHome() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("gameControls").style.display = "none";
    document.getElementById("scoreBox").style.display = "none";
    winMessage.style.display = "none";

    document.body.classList.remove("blur-bg");

    // 🔇 STOP MUSIC
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "grid";
    document.getElementById("gameControls").style.display = "flex";
    document.getElementById("scoreBox").style.display = "block";

    document.body.classList.add("blur-bg");

    // 🎵 PLAY MUSIC
    bgMusic.play();

    restartGame();
}

// 📖 guide
function showGuide() {
    alert("Match all pairs to win the game!");
}

// 👤 creator
function showCreator() {
    window.open("https://x.com/0xRusaa", "_blank");
}
const bgMusic = document.getElementById("bgMusic");

// 🎵 set volume to 40%
bgMusic.volume = 0.4;