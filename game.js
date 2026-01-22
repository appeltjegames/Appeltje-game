// ----------------------
// BASIS DATA
// ----------------------

let apples = 0;

const prices = {
    greenApple: 20,
    appleKid: 50,
    cheeseApple: 80,
    beeApple: 120
};

let inventory = [];


// ----------------------
// SAVE LOAD SYSTEM
// ----------------------

function saveGame() {
    const data = {
        apples: apples,
        inventory: inventory
    };
    localStorage.setItem("AppeltjeGameSave", JSON.stringify(data));
}

function loadGame() {
    const saved = localStorage.getItem("AppeltjeGameSave");

    if (saved) {
        const data = JSON.parse(saved);
        apples = data.apples || 0;
        inventory = data.inventory || [];
        updateUI();
        renderInventory();
    }
}


// ----------------------
// UI UPDATE
// ----------------------

function updateUI() {
    document.getElementById("appleCount").textContent = "Appels: " + apples;
}

function renderInventory() {
    const invDiv = document.getElementById("inventory");
    invDiv.innerHTML = "";

    inventory.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.textContent = item;
        invDiv.appendChild(div);
    });
}


// ----------------------
// SPEL ACTIES
// ----------------------

// Appel verzamelen
document.getElementById("collectBtn").addEventListener("click", function() {
    apples++;
    updateUI();
    saveGame();
});

// Winkel aankopen
document.querySelectorAll(".buy").forEach(btn => {
    btn.addEventListener("click", function() {
        const itemName = btn.dataset.item;
        const cost = prices[itemName];

        if (apples >= cost) {
            apples -= cost;
            inventory.push(itemName);
            updateUI();
            renderInventory();
            saveGame();
        } else {
            alert("Niet genoeg appels!");
        }
    });
});


// ----------------------
// GAME START
// ----------------------

loadGame();
