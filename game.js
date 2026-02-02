let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameRunning = false;

// Speler
let player = {
    x: 200,
    y: canvas.height - 150,
    width: 60,
    height: 80,
    vy: 0,
    onGround: true,
    speed: 3
};

// Start game
function startGame() {
    document.getElementById("home").style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    gameLoop();
}

// Simpele controls
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    if (e.key === "ArrowUp" && player.onGround) {
        player.vy = -15;
        player.onGround = false;
    }
    if (e.key === "ArrowLeft") player.x -= 20;
    if (e.key === "ArrowRight") player.x += 20;
});

// Game loop
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravity
    player.vy += 0.8;
    player.y += player.vy;

    if (player.y > canvas.height - 150) {
        player.y = canvas.height - 150;
        player.vy = 0;
        player.onGround = true;
    }

    // Player tekenen
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Appelhoofd
    ctx.beginPath();
    ctx.arc(player.x + 30, player.y - 10, 30, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();

    requestAnimationFrame(gameLoop);
}

// Placeholder functies
function openBakkerij() {
    alert("Bakkerij komt later!");
}

function openGarderobe() {
    alert("Garderobe komt later!");
}

function openPinpas() {
    alert("Pinpas komt later!");
}
