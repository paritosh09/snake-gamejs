let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 39) * 10,
    y: Math.floor(Math.random() * 39) * 10
};

let score = 0;

let dx = 10;
let dy = 0;

let gameInterval;
let gameSpeed = 100; // Default game speed (milliseconds)

function showGameSpeedModal() {
    document.getElementById('game-speed-modal').style.display = 'block';
}

function closeGameSpeedModal() {
    document.getElementById('game-speed-modal').style.display = 'none';
}

function setGameSpeed(speed) {
    closeGameSpeedModal();
    switch (speed) {
        case 'easy':
            gameSpeed = 200;
            break;
        case 'medium':
            gameSpeed = 100;
            break;
        case 'hard':
            gameSpeed = 50;
            break;
        default:
            gameSpeed = 100;
    }
    startGame();
}

function showGameOverModal() {
    document.getElementById("final-score").textContent = score;
    document.getElementById('game-over-modal').style.display = 'block';
}

function restartGame() {
    // Reset game state
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 }
    ];
    food = {
        x: Math.floor(Math.random() * 39) * 10,
        y: Math.floor(Math.random() * 39) * 10
    };
    score = 0;
    dx = 10;
    dy = 0;
    document.getElementById('game-over-modal').style.display = 'none';
    startGame();
}

function quitGame() {
    // Redirect user to a different page or close the window
    window.location.href = "your domain website";
}

function startGame() {
    gameInterval = setInterval(function() {
        updateSnake();
        drawSnake();
        checkCollision();
    }, gameSpeed);
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function updateSnake() {
    if (snake.length > 0) {
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
        snake[0].x += dx;
        snake[0].y += dy;
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score++;
            food.x = Math.floor(Math.random() * 39) * 10;
            food.y = Math.floor(Math.random() * 39) * 10;
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
        }
    }
}

function checkCollision() {
    if (snake.length > 0) {
        if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
            showGameOverModal();
            clearInterval(gameInterval);
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                showGameOverModal();
                clearInterval(gameInterval);
            }
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && dy !== 10) {
        dx = 0;
        dy = -10;
    } else if (event.key === 'ArrowDown' && dy !== -10) {
        dx = 0;
        dy = 10;
    } else if (event.key === 'ArrowLeft' && dx !== 10) {
        dx = -10;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx !== -10) {
        dx = 10;
        dy = 0;
    }
});

showGameSpeedModal();  