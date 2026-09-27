const questions = [
  {
    q: "What colour was she wearing when you first really noticed her?",
    hint: "Think back to Prem no divas...",
    answers: ["Pink", "Blue", "White", "Black"],
    correct: 0,
    right: "Of course. The pink kurta. The original plot twist."
  },
  {
    q: "What started turning those little conversations into longer ones?",
    hint: "It was technically academic at first.",
    answers: ["Notes", "Gaming", "Instagram reels", "A random dare"],
    correct: 0,
    right: "Notes. The most suspiciously effective academic material ever."
  },
  {
    q: "What was the legendary reward if there was no KT?",
    hint: "Very serious academic motivation.",
    answers: ["Pizza", "Momos", "Ice cream", "Burger"],
    correct: 1,
    right: "Momos. Obviously. The contract was binding."
  },
  {
    q: "Which place became one of those memorable walking-and-talking places?",
    hint: "Hint: Mumbai local energy.",
    answers: ["Bandra", "Churchgate", "Juhu", "Dadar"],
    correct: 1,
    right: "Churchgate. Somehow the walking was never the main activity."
  },
  {
    q: "What did he accidentally forget to wish properly?",
    hint: "This one still gets brought up.",
    answers: ["Birthday", "Anniversary", "Exam result", "Festival"],
    correct: 0,
    right: "The birthday. Yes. We are not deleting this chapter."
  },
  {
    q: "What was the official name for all that teasing and flirting?",
    hint: "A completely scientific term.",
    answers: ["Healthy flirting", "Professional flirting", "Academic flirting", "Controlled chaos"],
    correct: 0,
    right: "Healthy flirting™. Peer-reviewed, obviously."
  },
  {
    q: "What is the real point of this whole diary?",
    hint: "There is no wrong answer here.",
    answers: ["The photos", "The dates", "The memories", "All of it — because it's ours"],
    correct: 3,
    right: "Exactly. It's never just one memory. It's everything in between."
  }
];

let currentQuestion = 0;
let score = 0;
let quizLocked = false;

const pageLoader = document.getElementById("page-loader");
const quiz = document.getElementById("quiz");
const diary = document.getElementById("diary");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

window.addEventListener("load", () => {
  setTimeout(() => pageLoader.classList.add("hide"), 700);
  createHeart();
  setInterval(createHeart, 1700);
});

function startDiary() {
  document.getElementById("opening").classList.add("hidden");
  quiz.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  showQuestion();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showQuestion() {
  quizLocked = false;
  const item = questions[currentQuestion];
  document.getElementById("questionText").textContent = item.q;
  document.getElementById("questionHint").textContent = item.hint;
  document.getElementById("progressText").textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  document.getElementById("quizProgress").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;
  document.getElementById("quizFeedback").textContent = "";

  const options = document.getElementById("options");
  options.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = answer;
    button.onclick = () => answerQuestion(index, button);
    options.appendChild(button);
  });
}

function answerQuestion(index, clickedButton) {
  if (quizLocked) return;
  quizLocked = true;

  const item = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((button, i) => {
    if (i === item.correct) button.classList.add("correct");
    if (i === index && i !== item.correct) button.classList.add("wrong");
  });

  const feedback = document.getElementById("quizFeedback");

  if (index === item.correct) {
    score++;
    feedback.textContent = item.right;
  } else {
    feedback.textContent = "Close enough. The diary has decided to forgive you. ♡";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 1150);
}

function finishQuiz() {
  const card = document.getElementById("quizCard");
  card.innerHTML = `
    <p class="quiz-kicker">Memory check complete ♡</p>
    <h2>You remembered ${score}/${questions.length}.</h2>
    <p class="quiz-hint">
      But honestly, this diary isn't a test. It's a collection of little moments
      that became much bigger than they looked at the time.
    </p>
    <button class="primary-btn" onclick="openDiary()">
      <span>Open our story</span><b>→</b>
    </button>
  `;
}

function openDiary() {
  quiz.classList.add("hidden");
  diary.classList.remove("hidden");
  document.body.classList.remove("no-scroll");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    revealOnScroll();
  }, 300);
}

function openChapters() {
  document.getElementById("chapter1").scrollIntoView({ behavior: "smooth" });
}

function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.classList.add("playing");
      musicText.textContent = "playing...";
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
      musicText.textContent = "Our song";
    }
  } catch {
    musicText.textContent = "add our_song.mp3";
  }
});

function createHeart() {
  if (document.getElementById("opening")?.classList.contains("hidden") && Math.random() > .55) return;

  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > .25 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 15}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  document.getElementById("floatingHearts").appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}

function revealOnScroll() {
  const items = document.querySelectorAll(".chapter, .final-letter");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(35px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 850, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });

  items.forEach(item => observer.observe(item));
}

function restartDiary() {
  currentQuestion = 0;
  score = 0;
  quizLocked = false;
  diary.classList.add("hidden");
  document.getElementById("opening").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Tiny cursor heart on desktop
const cursorHeart = document.getElementById("cursorHeart");
if (window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", e => {
    cursorHeart.style.left = `${e.clientX + 10}px`;
    cursorHeart.style.top = `${e.clientY + 10}px`;
  });
} else {
  cursorHeart.style.display = "none";
}
