const cards = document.querySelectorAll('.card');
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score"); // New score display
const restartButton = document.getElementById("restart-button");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let attempts = 0;
let timer;
let timeElapsed = 0;
let score = 0; // Initialize score

startButton.addEventListener("click", startGame);

function startGame() {
    resetGame();
    shuffleCard();
    timer = setInterval(updateTimer, 1000); // Start timer
}

function resetGame() {
    clearInterval(timer);
    timeElapsed = 0;
    attempts = 0;
    matchedCard = 0;
    score = 0; // Reset score
    cardOne = cardTwo = null;
    disableDeck = false;

    timerDisplay.textContent = `Time: 0s`;
    attemptsDisplay.textContent = `Attempts: 0`;
    scoreDisplay.textContent = `Score: 0`; // Reset score display

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}

function updateTimer() {
    timeElapsed++;
    timerDisplay.textContent = `Time: ${timeElapsed}s`;
}

function flipCard(e) {
    let clickedCard = e.target;

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');

        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }

        cardTwo = clickedCard;
        disableDeck = true;
        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        
        let cardOneImg = cardOne.querySelector('img').src;
        let cardTwoImg = cardTwo.querySelector('img').src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        score += 20; // Increase score by 10 points for each correct match
        scoreDisplay.textContent = `Score: ${score}`; // Update score display

        if (matchedCard === cards.length / 2) { // All pairs matched
            clearInterval(timer);
            setTimeout(() => alert(`Game Over! You completed the game in ${attempts} attempts, ${timeElapsed} seconds, and scored ${score} points.`), 500);
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        resetFlipState();
    } else {
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            resetFlipState();
        }, 1200);
    }
}

function resetFlipState() {
    cardOne = cardTwo = null;
    disableDeck = false;
}

function shuffleCard() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        const imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
        card.classList.remove("flip");
    });
}
restartButton.addEventListener("click", startGame);
