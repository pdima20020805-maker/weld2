const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const siteContent = document.getElementById("siteContent");
const bgMusic = document.getElementById("bgMusic");

startBtn.addEventListener("click", () => {
    siteContent.classList.add("show");
    startScreen.classList.add("hide");

    bgMusic.play().catch(error => {
        console.log("Музыка не запустилась:", error);
    });

    setTimeout(() => {
        startScreen.remove();
    }, 600);
});


const targetDate = new Date("2026-10-17T00:00:00").getTime();

function updateTimer() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold:0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});