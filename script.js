const list = document.getElementById("list");
const message = document.getElementById("message");
const heartsContainer = document.querySelector(".hearts");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const valentineButtons = document.getElementById("valentineButtons");
const explosionContainer = document.getElementById("explosionContainer");

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const hintBtn = document.getElementById("hint");
const hintText = document.getElementById("hintText");
const loveMeter = document.getElementById("loveMeter");
const loveSlider = document.getElementById("loveSlider");
const loveValue = document.getElementById("loveValue");

// Ukrycie przycisków na start
valentineButtons.style.display = "none";

// Funkcja do tworzenia serc
function createHeart() {
    const heart = document.createElement("span");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
// Ciągła animacja serc
setInterval(createHeart, 500);

// Funkcja wybuchu
function showRock() {
    const rock = document.createElement("img");
    rock.src = "rock.png"; // obrazek rock.png
    rock.style.position = "absolute";
    rock.style.width = "1920x";
    rock.style.height = "1080px";
    rock.style.top = "40%";
    rock.style.left = "50%";
    rock.style.transform = "translate(-50%, -50%) scale(0)";
    rock.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    rock.style.opacity = "0";

    explosionContainer.appendChild(rock);

    setTimeout(() => {
        rock.style.transform = "translate(-50%, -50%) scale(1)";
        rock.style.opacity = "1";
    }, 50);

    setTimeout(() => rock.remove(), 1000);
}

function showExplosion() {
    const explosion = document.createElement("img");
    explosion.src = "wybuch.png";
    explosionContainer.appendChild(explosion);
    setTimeout(() => explosion.classList.add("show"), 50);
    setTimeout(() => explosion.remove(), 1000);
}

// Kliknięcie listu
list.addEventListener("click", () => {
    list.classList.add("open");
    message.classList.add("show");

    setTimeout(() => {
        valentineButtons.style.display = "block";
        valentineButtons.classList.add("show");
    }, );
    
});

// Kliknięcie TAK
yesBtn.addEventListener("click", () => {
    list.style.display = "none";
    valentineButtons.style.display = "none";
    quiz.style.display = "block";
    loadQuestion();
});

noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

const questions = [
    { q: "Gdzie i kiedy zostaliśmy parą (dokładnie data, godzina)?", hint: "Data zaczyna się od 31.01.____ 02:12:57:242:152", check: a => a.includes("31.01.2025 02:12:57:242:152") },
    { q: "Co lubię jeść?", hint: "wszy......o (wiadomo nie jakas jebana fasolke)", check: a => a.toLowerCase().includes("wszystko") },
    { q: "Co chciałbym teraz zjeść?", hint: "Jest w tym pokoju", check: a => a.toLowerCase().includes("mnie") },
    { q: "Ile trwa 6 noc w FNAF?", hint: "(√(17^2 − 8^2) + log_2(16) · cos(60°) + ln(√[5](e^0.5))) / 2 = ?", check: a => a.includes("8:55") },
    { q: "Gotowa na najważniejsze pytanie?", hint: "Zaraz będzie słodko ❤️", check: a => a.toLowerCase().includes("tak") }
];
let current = 0;

function loadQuestion() {
    questionEl.textContent = questions[current].q;
    hintText.textContent = "";
    answerEl.value = "";
}

document.getElementById("submit").addEventListener("click", () => {
    const answer = answerEl.value;
    if (questions[current].check(answer)) {
       
;
        current++;
        if (current < questions.length) {
            loadQuestion();
        } else {
            quiz.style.display = "none";
            loveMeter.style.display = "block";
            loveSlider.value = 100;
            loveValue.textContent = "100%";
        }
    } else {
        const pipeSound = new Audio("pipe.mp3");
        pipeSound.play();
        alert("🥲🥲🥲 zła odpowiedź skarbie 🥲🥲🥲");
    }
});


hintBtn.addEventListener("click", () => {
    hintText.textContent = questions[current].hint;
});

// Slider
loveSlider.addEventListener("input", () => {
    if (loveSlider.value == 0) {
        loveValue.textContent = "NIE KOCHAM 😭😭";
        loveValue.classList.add("warning");
        loveValue.classList.remove("full");
    } else if (loveSlider.value < 100) {
        loveValue.textContent = "Nie kocham 🥲🥲";
        loveValue.classList.add("warning");
        loveValue.classList.remove("full");
    } else {
        loveValue.textContent = "KOCHAM BARDZO ❤️❤️";
        loveValue.classList.remove("warning");
        loveValue.classList.add("full");
    }
});
document.getElementById("confirmLove").addEventListener("click", () => {
    if (loveSlider.value < 100) {
        document.body.querySelectorAll(".main > *").forEach(el => el.style.display = "none");
        const finalMsg = document.createElement("div");
        finalMsg.id = "finalMessage";
        finalMsg.textContent = "😭😭😭 TERAZ JESTEM NAJSMUTNIEJSZYM MEZCZYNA NA SWIECIE 😭😭😭 ";
        const pipeSound = new Audio("pipe.mp3");
        pipeSound.play();
      

        document.body.appendChild(finalMsg);
    } else {
        // Ukryj wszystko na stronie
        document.body.querySelectorAll(".main > *").forEach(el => el.style.display = "none");

        // Dodaj wielki pulsujący napis
        const finalMsg = document.createElement("div");
        finalMsg.id = "finalMessage";
        finalMsg.textContent = "❤️❤️❤️ Popatrz za siebie skarbie ❤️❤️❤️";
        document.body.appendChild(finalMsg);
    }
});



