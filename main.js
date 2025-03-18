/* styles.css */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #2c3e50;
    margin: 0;
    font-family: Arial, sans-serif;
}

.game-container {
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

#gameCanvas {
    border: 3px solid #34495e;
    background: #ecf0f1;
}

.controls {
    margin-top: 20px;
    text-align: center;
}

button {
    padding: 12px 25px;
    font-size: 18px;
    background: #27ae60;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #219a52;
}

.score-board {
    margin-top: 15px;
    color: #fff;
    font-size: 18px;
    background: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 5px;
}
