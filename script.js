// Set the countdown date (matches HTML: May 17, 2025, 11:30 AM)
const countdownDate = new Date("May 17, 2025 11:30:00").getTime();

// Countdown Timer
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "The baby shower has begun!";
    }
}, 1000);

// Smooth Scrolling for Navigation Links
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
    });
});

// Active Navigation on Scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("nav a");
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

// Fade-in Animation for Sections
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".section").forEach((section) => {
        section.style.opacity = "0";
        section.style.transition = "opacity 1s ease-in-out";
        observer.observe(section);
    });

    // Define fade-in style
    const style = document.createElement("style");
    style.textContent = `
        .fade-in { opacity: 1 !important; }
        nav a.active { color: var(--primary-color, #3498db); font-weight: bold; }
    `;
    document.head.appendChild(style);
});

// Maps Function (moved from inline HTML)
function openMaps(e) {
    e.preventDefault();
    const address = "Crispy's Springfield Gallery, 1735 N Main St, Jacksonville, FL 32206";
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    try {
        window.open(
            isIOS
                ? `maps://maps.apple.com/?q=${encodedAddress}`
                : `https://maps.google.com/?q=${encodedAddress}`,
            "_blank"
        );
    } catch (error) {
        alert("Unable to open maps. Search manually: " + address);
    }
}

// Attach maps function to button
document.querySelector(".maps-btn")?.addEventListener("click", openMaps);