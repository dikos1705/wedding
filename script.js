const weddingDate = new Date("2026-08-22T18:00:00+05:00");

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;
  const values = difference <= 0
    ? [0, 0, 0, 0]
    : [
        Math.floor(difference / (1000 * 60 * 60 * 24)),
        Math.floor((difference / (1000 * 60 * 60)) % 24),
        Math.floor((difference / (1000 * 60)) % 60),
        Math.floor((difference / 1000) % 60)
      ];

  ["days", "hours", "minutes", "seconds"].forEach((id, index) => {
    const item = document.getElementById(id);
    if (item) item.textContent = String(values[index]).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const bgMusic = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");
const musicIcon = musicControl?.querySelector(".music-icon");
const musicLabel = musicControl?.querySelector(".music-label");

if (bgMusic) {
  bgMusic.volume = 0.45;
}

function setMusicState(isPlaying) {
  if (!musicControl) return;
  musicControl.setAttribute("aria-pressed", String(isPlaying));
  musicControl.classList.toggle("is-playing", isPlaying);
  if (musicIcon) musicIcon.textContent = isPlaying ? "❚❚" : "▶";
  if (musicLabel) musicLabel.textContent = isPlaying ? "Тоқтату" : "Музыка";
}

async function startMusic() {
  if (!bgMusic) return;
  try {
    await bgMusic.play();
    setMusicState(true);
    removeMusicUnlockListeners();
  } catch (error) {
    // Браузер күштеп autoplay қосуға рұқсат бермеуі мүмкін.
  }
}

function removeMusicUnlockListeners() {
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
  document.removeEventListener("scroll", startMusic);
}

bgMusic?.addEventListener("play", () => setMusicState(true));
bgMusic?.addEventListener("pause", () => setMusicState(false));

window.addEventListener("load", startMusic);
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("scroll", startMusic, { once: true });

musicControl?.addEventListener("click", async (event) => {
  event.stopPropagation();
  if (!bgMusic) return;

  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      setMusicState(true);
    } else {
      bgMusic.pause();
      setMusicState(false);
    }
  } catch (error) {
    console.warn("Музыканы ойнату мүмкін болмай тұр:", error);
  }
});

const surveyForm = document.getElementById("surveyForm");
const formNote = document.getElementById("formNote");
const submitButton = surveyForm?.querySelector(".submit-btn");
const guestNameInput = surveyForm?.querySelector('input[name="entry.1115765674"]');
const attendanceInputs = surveyForm
  ? Array.from(surveyForm.querySelectorAll('input[name="entry.2018536969"]'))
  : [];

surveyForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = guestNameInput?.value.trim();
  const hasAttendance = attendanceInputs.some((input) => input.checked);

  if (!name || !hasAttendance) {
    if (formNote) formNote.textContent = "Өтініш, аты-жөніңізді жазып, жауап таңдаңыз.";
    return;
  }

  if (formNote) formNote.textContent = "Жауабыңыз жіберіліп жатыр...";
  if (submitButton) submitButton.disabled = true;

  surveyForm.submit();

  window.setTimeout(() => {
    if (formNote) formNote.textContent = "Жауабыңыз Google Forms-қа жіберілді. Рақмет!";
    surveyForm.reset();
    if (submitButton) submitButton.disabled = false;
  }, 900);
});

setMusicState(false);
