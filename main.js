// main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const currentScoreElem = document.getElementById('currentScore');
const highScoreElem = document.getElementById('highScore');

// 游戏参数[1](@ref)
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let isPlaying = false;
const deathSound = new Audio('death.mp3');

// 初始化最高分显示
highScoreElem.textContent = highScore;

// 游戏控制逻辑
function startGame() {
    if (!isPlaying) {
        resetGame();
        gameLoop = setInterval(update, 100);
        startBtn.textContent = "暂停游戏";
        isPlaying = true;
    } else {
        clearInterval(gameLoop);
        startBtn.textContent = "继续游戏";
        isPlaying = false;
    }
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    currentScoreElem.textContent = score;
    generateFood();
}

function generateFood() {
    // 确保食物不与蛇身重叠[2](@ref)
    do {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function update() {
    // 移动逻辑
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // 碰撞检测[1,2](@ref)
    if (head.x < 0 || head.x >= tileCount || 
        head.y < 0 || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            deathSound.play();
            clearInterval(gameLoop);
            updateHighScore();
            startBtn.textContent = "重新开始";
            isPlaying = false;
            return;
    }

    snake.unshift(head);
    
    // 吃食物逻辑
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        currentScoreElem.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    // 清空画布
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇身
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#e74c3c' : '#2ecc71';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
    });
    
    // 绘制食物
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2-2, 0, Math.PI*2);
    ctx.fill();
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElem.textContent = highScore;
    }
}

// 事件监听
startBtn.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    // 方向控制（禁止反向移动）[1](@ref)
    switch(e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});
