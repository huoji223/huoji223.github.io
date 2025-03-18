// main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 20;
const GRID_COUNT = canvas.width / GRID_SIZE;

// 游戏状态
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameLoop;
let clickCount = 0;

// 元素引用
const clickCounterBtn = document.getElementById('clickCounter');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// 点击计数器功能
clickCounterBtn.addEventListener('click', () => {
    clickCount++;
    clickCounterBtn.textContent = `点击次数：${clickCount}`;
});

// 重置计数器
resetBtn.addEventListener('click', () => {
    clickCount = 0;
    clickCounterBtn.textContent = '点击次数：0';
});

// 游戏控制
startBtn.addEventListener('click', () => {
    if (!gameLoop) {
        gameLoop = setInterval(update, 150);
        startBtn.textContent = '暂停游戏';
    } else {
        clearInterval(gameLoop);
        gameLoop = null;
        startBtn.textContent = '继续游戏';
    }
});

// 生成食物（参考网页1、7、9）
function generateFood() {
    while(true) {
        const newFood = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
        if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
}

// 游戏逻辑更新（参考网页3、7、8）
function update() {
    // 移动蛇头
    const head = {...snake[0]};
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // 碰撞检测（参考网页1、8）
    if (head.x < 0 || head.x >= GRID_COUNT || 
        head.y < 0 || head.y >= GRID_COUNT ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`游戏结束！得分：${snake.length}`);
        resetGame();
        return;
    }

    snake.unshift(head);

    // 吃食物判定（参考网页6、7）
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    draw();
}

// 绘制游戏（参考网页1、7、11）
function draw() {
    // 清空画布
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    });

    // 绘制食物（参考网页7、9）
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE/2,
        food.y * GRID_SIZE + GRID_SIZE/2,
        GRID_SIZE/2 - 2,
        0, Math.PI * 2
    );
    ctx.fill();
}

// 重置游戏（参考网页8、9）
function resetGame() {
    clearInterval(gameLoop);
    gameLoop = null;
    snake = [{x: 10, y: 10}];
    direction = 'right';
    food = generateFood();
    startBtn.textContent = '开始游戏';
    draw();
}

// 键盘控制（参考网页1、8、10）
document.addEventListener('keydown', (e) => {
    const key = e.key.replace('Arrow', '');
    const opposite = {
        up: 'down', down: 'up',
        left: 'right', right: 'left'
    };
    if (opposite[direction] !== key.toLowerCase()) {
        direction = key.toLowerCase();
    }
});

// 初始绘制
draw();
