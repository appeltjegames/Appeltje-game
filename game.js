// ====== EENVOUDIGE STATE ======
let currentLevel = 1;
let maxLevel = 20;
let applesCollected = 0;
let coins = 0;
let ingredients = {
  apple: false,
  cheese: false,
  bread: false,
  puff: false
};
let carUnlocked = false;

const tasks = [
  "Appel‑Estafette: Houd samen één appel boven water terwijl jullie naar de overkant zwemmen. Foto: iedereen met één hand aan de appel.",
  "Drijvende Appelcirkel: Maak een kring in het water en laat één appel in het midden drijven. Foto: kring + appel in het midden.",
  "Kaasplankje: Leg een drijvend plankje in het water en laat er een stuk kaas op liggen. Zwem er samen omheen zonder het plankje te laten kantelen. Foto: team + plankje + kaas.",
  "Appel‑Toren: Bouw met drijvende materialen een mini‑vlotje en probeer er een appel op te laten balanceren. Foto: vlot + appel + team.",
  "Synchroon Appel‑Zwemmen: Twee personen houden samen één appel vast en zwemmen synchroon 5 meter. Foto: tijdens het synchroon zwemmen.",
  "Waterappel Door‑geef‑Race: Geef een appel door met alleen je kin of schouders. Foto: doorgeefmoment.",
  "Appel‑Duik: Laat een appel in het water vallen. Eén duikt, de ander wijst de richting. Foto: appel in de lucht of net in het water.",
  "Kaas‑Ketting: Houd een stuk kaas (in plastic verpakt) boven water terwijl jullie elkaar voorttrekken. Foto: team + kaas boven water.",
  "Drijvende Appel‑Selfie: Laat een appel drijven en maak een groepsselfie met de appel op de voorgrond.",
  "Appel‑Balans: Eén persoon zwemt op de rug, de ander legt een appel op diens buik. Foto: appel op buik + drijvende persoon.",
  "Appel‑Reddingsactie: Doe alsof de appel een “drenkeling” is en werk samen om hem op een drijvend matje te krijgen. Foto: appel op matje + team.",
  "Kaas‑Kruip: Kruip onder een drijvend plankje door terwijl iemand anders een stuk kaas erop in balans houdt. Foto: iemand onder plankje + kaas erop.",
  "Appel‑Slalom: Zet drijvende objecten neer als slalom. Zwem er samen doorheen terwijl één persoon een appel vasthoudt. Foto: tijdens de slalom.",
  "Appel‑Hooghouden: Probeer een appel op het wateroppervlak te laten stuiteren of duwen zonder dat hij zinkt. Foto: actie‑shot.",
  "Appel‑Vangnet: Maak met jullie armen een “vangnet” in het water en laat iemand een appel erin gooien. Foto: vangnet + appel.",
  "Kaas‑Duet: Twee personen houden samen een stuk kaas vast en moeten een rondje draaien in het water. Foto: draai‑moment.",
  "Appel‑Onderwater‑Doorgeef: Geef een appel onder water door zonder boven te komen. Foto: net boven water met appel in hand.",
  "Appel‑Rug‑Rit: Eén persoon draagt de ander op de rug terwijl die een appel omhoog houdt. Foto: rug‑rit + appel.",
  "Appel‑Golfmaker: Maak samen golven zodat een appel naar de overkant drijft zonder dat iemand hem aanraakt. Foto: golvende waterlijn + appel.",
  "Appel‑Pose: Maak een creatieve groepspose in het water met een appel als “trofee”. Foto: jullie + appel in het midden."
];

// ====== SCHERMEN WISSELEN ======
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');

  if (id === 'home-screen') {
    updateHomeBlock();
  }
  if (id === 'bakery-screen') {
    updateBakery();
  }
  if (id === 'wardrobe-screen') {
    updateCoins();
  }
}

// ====== LAADSCHERM ======
document.addEventListener('DOMContentLoaded', () => {
  const loadBar = document.getElementById('load-bar');
  let loadProgress = 0;

  const loadInterval = setInterval(() => {
    loadProgress += 5;
    if (loadBar) {
      loadBar.style.width = loadProgress + '%';
    }
    if (loadProgress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        showScreen('home-screen');
      }, 400);
    }
  }, 150);

  setupHome();
  setupGame();
  setupReward();
  setupTasks();
  setupBakery();
  setupWardrobe();
});

// ====== HOMEPAGE ======
function setupHome() {
  const blockLevel = document.getElementById('block-level');
  const blockBakery = document.getElementById('block-bakery');
  const blockWardrobe = document.getElementById('block-wardrobe');
  const blockPin = document.getElementById('block-pin');

  if (blockLevel) {
    blockLevel.addEventListener('click', startLevel);
  }
  if (blockBakery) {
    blockBakery.addEventListener('click', () => showScreen('bakery-screen'));
  }
  if (blockWardrobe) {
    blockWardrobe.addEventListener('click', () => showScreen('wardrobe-screen'));
  }
  if (blockPin) {
    blockPin.addEventListener('click', () => showScreen('pin-screen'));
  }

  updateHomeBlock();
}

function updateHomeBlock() {
  const block = document.getElementById('block-level');
  if (block) {
    block.textContent = 'Level ' + currentLevel;
  }
}

// ====== SPEL ======
function setupGame() {
  const exitBtn = document.getElementById('btn-exit-game');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => showScreen('home-screen'));
  }

  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applesCollected++;
      const appleCount = document.getElementById('apple-count');
      if (appleCount) {
        appleCount.textContent = applesCollected;
      }
    });
  });
}

function startLevel() {
  applesCollected = 0;
  const appleCount = document.getElementById('apple-count');
  if (appleCount) appleCount.textContent = applesCollected;

  showScreen('game-screen');

  const levelDuration = currentLevel >= 10 && carUnlocked ? 2000 : 4000;
  setTimeout(() => {
    finishLevel();
  }, levelDuration);
}

function finishLevel() {
  coins += 5;

  let rewardText = "";
  let showReward = false;

  if (currentLevel === 3) {
    ingredients.apple = true;
    rewardText = "Gefeliciteerd, je hebt level drie behaald! Als prijs krijg je een appel, die heb je nodig voor jouw kaasappelmobiel! Je kan hem vinden in je bakkerij.";
    showReward = true;
  } else if (currentLevel === 5) {
    ingredients.cheese = true;
    rewardText = "Gefeliciteerd, je hebt level vijf behaald! Je krijgt een stuk kaas. Je vindt het in je bakkerij.";
    showReward = true;
  } else if (currentLevel === 7) {
    ingredients.bread = true;
    rewardText = "Gefeliciteerd, je hebt level zeven behaald! Je krijgt brood. Je vindt het in je bakkerij.";
    showReward = true;
  } else if (currentLevel === 10) {
    ingredients.puff = true;
    rewardText = "Gefeliciteerd, je hebt level tien behaald! Je krijgt bladerdeeg. Nu kun je je kaasappelmobiel maken in de bakkerij!";
    showReward = true;
  }

  if (showReward) {
    const rewardTitle = document.getElementById('reward-title');
    const rewardTextEl = document.getElementById('reward-text');
    if (rewardTitle) rewardTitle.textContent = "Gefeliciteerd!";
    if (rewardTextEl) rewardTextEl.textContent = rewardText;
    showScreen('reward-screen');
  } else {
    showTaskScreen();
  }

  if (currentLevel < maxLevel) {
    currentLevel++;
  }
}

// ====== BELONINGSSCHERM ======
function setupReward() {
  const btnRewardNext = document.getElementById('btn-reward-next');
  if (btnRewardNext) {
    btnRewardNext.addEventListener('click', showTaskScreen);
  }
}

// ====== OPDRACHTENSCHERM ======
function setupTasks() {
  const camera = document.getElementById('task-camera');
  const info = document.getElementById('task-info');
  const btnContinue = document.getElementById('btn-task-continue');

  if (camera && info) {
    camera.addEventListener('click', () => {
      info.textContent = "Foto gemaakt! Je krijgt een appelsap op je Sijsjesberg pinpas (simulatie).";
    });
  }

  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      if (currentLevel > maxLevel) currentLevel = maxLevel;
      showScreen('home-screen');
    });
  }
}

function showTaskScreen() {
  const levelForTask = currentLevel - 1;
  const taskIndex = Math.min(levelForTask - 1, tasks.length - 1);

  const taskLevelSpan = document.getElementById('task-level');
  const taskText = document.getElementById('task-text');

  if (taskLevelSpan) taskLevelSpan.textContent = levelForTask;
  if (taskText) taskText.textContent = tasks[taskIndex];

  showScreen('task-screen');
}

// ====== BAKKERIJ ======
function setupBakery() {
  const btnGo = document.getElementById('btn-bakery-go');
  if (btnGo) {
    btnGo.addEventListener('click', () => {
      const allFull = ingredients.apple && ingredients.cheese && ingredients.bread && ingredients.puff;
      if (allFull) {
        carUnlocked = true;
        updateBakery();
      } else {
        alert("Je mist nog ingrediënten voor de kaasappelmobiel!");
      }
    });
  }
}

function updateBakery() {
  const slotApple = document.getElementById('slot-apple');
  const slotCheese = document.getElementById('slot-cheese');
  const slotBread = document.getElementById('slot-bread');
  const slotPuff = document.getElementById('slot-puff');
  const car = document.getElementById('bakery-car');
  const info = document.getElementById('bakery-info');

  if (slotApple) {
    slotApple.classList.toggle('filled', ingredients.apple);
    slotApple.textContent = ingredients.apple ? "Appel ✓" : "Appel";
  }
  if (slotCheese) {
    slotCheese.classList.toggle('filled', ingredients.cheese);
    slotCheese.textContent = ingredients.cheese ? "Kaas ✓" : "Kaas";
  }
  if (slotBread) {
    slotBread.classList.toggle('filled', ingredients.bread);
    slotBread.textContent = ingredients.bread ? "Brood ✓" : "Brood";
  }
  if (slotPuff) {
    slotPuff.classList.toggle('filled', ingredients.puff);
    slotPuff.textContent = ingredients.puff ? "Bladerdeeg ✓" : "Bladerdeeg";
  }

  const allFull = ingredients.apple && ingredients.cheese && ingredients.bread && ingredients.puff;

  if (info) {
    if (carUnlocked) {
      info.textContent = "Je kaasappelmobiel is klaar! Hij verschijnt nu in de levels.";
    } else if (allFull) {
      info.textContent = "Alle ingrediënten verzameld! Klik op Go! om je kaasappelmobiel te maken.";
    } else {
      info.textContent = "Verzamel alle ingrediënten door levels te halen.";
    }
  }

  if (car) {
    if (carUnlocked) {
      car.classList.remove('hidden');
    } else {
      car.classList.add('hidden');
    }
  }
}

// ====== GARDEROBE ======
function setupWardrobe() {
  updateCoins();

  const cards = document.querySelectorAll('.wardrobe-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const price = parseInt(card.dataset.price || "0", 10);
      const avatarType = card.dataset.avatar;

      if (price > 0 && coins < price && !card.classList.contains('wardrobe-selected')) {
        alert("Je hebt niet genoeg munten om dit poppetje te kopen.");
        return;
      }

      if (price > 0 && !card.classList.contains('wardrobe-selected')) {
        coins -= price;
        updateCoins();
      }

      cards.forEach(c => c.classList.remove('wardrobe-selected'));
      card.classList.add('wardrobe-selected');

      setMainAvatar(avatarType);
    });
  });
}

function updateCoins() {
  const coinCount = document.getElementById('coin-count');
  if (coinCount) {
    coinCount.textContent = coins;
  }
}

function setMainAvatar(type) {
  const avatar = document.getElementById('main-avatar');
  if (!avatar) return;

  const body = avatar.querySelector('.avatar-body');
  const legs = avatar.querySelector('.avatar-legs');
  const shoes = avatar.querySelector('.avatar-shoes');

  if (!body || !legs || !shoes) return;

  if (type === 'boy-free') {
    body.style.background = '#ffffff';
    legs.style.background = '#1565c0';
    shoes.style.background = '#fff';
  } else if (type === 'girl-curly') {
    body.style.background = '#000000';
    legs.style.background = '#90caf9';
    shoes.style.background = '#ffffff';
  } else if (type === 'boy-blond') {
    body.style.background = '#ffffff';
    legs.style.background = '#90caf9';
    shoes.style.background = '#ffffff';
  }
}
