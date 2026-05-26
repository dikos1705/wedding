const weddingDate = new Date("2026-08-22T19:00:00+05:00");

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
    document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.45;

async function startMusic() {
  try {
    await bgMusic.play();
    removeMusicUnlockListeners();
  } catch (error) {
    // Браузер заблокировал autoplay — ждём первого действия гостя.
  }
}

function removeMusicUnlockListeners() {
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
  document.removeEventListener("scroll", startMusic);
}

window.addEventListener("load", startMusic);

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("scroll", startMusic, { once: true });

const rsvpBtn = document.getElementById("rsvpBtn");
const rsvpNote = document.getElementById("rsvpNote");
// Google Form дайын болса, төмендегі WhatsApp сілтемесін Google Form сілтемесіне ауыстыру жеткілікті:
// const RSVP_URL = "https://wa.me/77778018143?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5%21%20%D0%9C%D0%B5%D0%BD%20%D0%A1%D0%B0%D0%BD%D0%B6%D0%B0%D1%80%20%D0%BC%D0%B5%D0%BD%20%D0%90%D0%B9%D0%B7%D0%B0%D1%82%D1%82%D1%8B%D2%A3%20%D1%82%D0%BE%D0%B9%D1%8B%D0%BD%D0%B0%20%D2%9B%D0%B0%D1%82%D1%8B%D1%81%D1%83%D1%8B%D0%BC%D0%B4%D1%8B%20%D1%80%D0%B0%D1%81%D1%82%D0%B0%D0%B9%D0%BC%D1%8B%D0%BD.%0A%0A%D0%90%D1%82%D1%8B-%D0%B6%D3%A9%D0%BD%D1%96%D0%BC%3A%20%0A%D2%9A%D0%BE%D0%BD%D0%B0%D2%9B%20%D1%81%D0%B0%D0%BD%D1%8B%3A%20%0A%D0%A2%D1%96%D0%BB%D0%B5%D0%BA/%D0%B5%D1%81%D0%BA%D0%B5%D1%80%D1%82%D1%83%3A%20";
const RSVP_URL = "https://forms.gle/YCdG4FSxFgZLtQ8w6";


rsvpBtn.addEventListener("click", () => {
  if (RSVP_URL) {
    window.open(RSVP_URL, "_blank", "noopener,noreferrer");
    return;
  }
  rsvpNote.textContent = "Сілтеме ашылмады. Нөмір: +7 700 590 5555";
  setTimeout(() => { rsvpNote.textContent = ""; }, 4200);
});
