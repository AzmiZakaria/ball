var board = document.getElementById("board");
var ball = document.getElementById("ball");
var paddle = document.getElementById("paddle");
var startGameBtn = document.getElementById("start-game");
var gameMessage = document.getElementById("game-message");
var gameStatus = document.getElementById("game-status");
var scoreDisplay = document.getElementById("score");
var livesDisplay = document.getElementById("lives");
var boardWidth = board.offsetWidth;
var boardHeight = board.offsetHeight;
var ballSize = ball.offsetWidth;
var paddleWidth = paddle.offsetWidth;
var x = boardWidth / 2 - ballSize / 2; // Initial x position of the ball
var y = boardHeight / 2 - ballSize / 2; // Initial y position of the ball
var dx = Math.random() * 2 - 1; // Initial x velocity of the ball (-1 to 1)
var dy = Math.random() * 2 - 1; // Initial y velocity of the ball (-1 to 1)
var paddleSpeed = 5; // Speed of the paddle movement
var lives = 3;
var score = 0;
var gameInterval;

function startGame() {
    startGameBtn.style.display = "none";
    gameMessage.style.display = "none";
    lives = 3;
    score = 0;
    updateScore();
    updateLives();
    resetBall();
    gameInterval = setInterval(updateGame, 10);
}

function updateGame() {
    // Update position of the ball
    x += dx;
    y += dy;

    // Check for collision with board boundaries on x-axis
    if (x <= 0 || x >= boardWidth - ballSize) {
        dx = -dx; // Reverse x direction
    }

    // Check for collision with board boundaries on y-axis
    if (y <= 0 || y >= boardHeight - ballSize) {
        dy = -dy; // Reverse y direction
    }

    // Update ball position
    ball.style.left = x + "px";
    ball.style.top = y + "px";
}

function resetBall() {
    x = boardWidth / 2 - ballSize / 2;
    y = boardHeight / 2 - ballSize / 2;
    dx = Math.random() * 2 - 1; // Random x velocity (-1 to 1)
    dy = Math.random() * 2 - 1; // Random y velocity (-1 to 1)
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function updateLives() {
    livesDisplay.textContent = "Lives: " + lives;
}

function endGame(outcome) {
    clearInterval(gameInterval);
    gameStatus.textContent = outcome === "lose" ? "You Lose!" : "You Win!";
    scoreDisplay.textContent = "Final Score: " + score;
    gameMessage.style.display = "block";
    startGameBtn.textContent = "Play Again";
    startGameBtn.style.display = "block";
}

// Event listener for key presses
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        movePaddle(-paddleSpeed); // Move paddle left
    } else if (event.key === "ArrowRight") {
        movePaddle(paddleSpeed); // Move paddle right
    }
});

function movePaddle(speed) {
    // Calculate new position of the paddle
    var newX = paddle.offsetLeft + speed;

    // Ensure the paddle stays within the board boundaries
    if (newX >= 0 && newX <= boardWidth - paddleWidth) {
        paddle.style.left = newX + "px";
    }
}

startGameBtn.addEventListener("click", startGame);
