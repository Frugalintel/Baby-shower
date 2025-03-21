// Set countdown date with timezone
const countdownDate = new Date("2025-05-17T11:30:00-04:00").getTime();

// Optimized Countdown Timer
const countdown = setInterval(() => {
    const now = Date.now();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "The baby shower has begun!";
        return;
    }

    const timeUnits = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };

    Object.entries(timeUnits).forEach(([unit, value]) => {
        document.getElementById(unit).textContent = String(value).padStart(2, "0");
    });
}, 1000);

// Debounce function
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Smooth Scrolling with offset
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector("nav").offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navHeight,
            behavior: "smooth"
        });
    });
});

// Active Navigation with debounced scroll
window.addEventListener("scroll", debounce(() => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("nav a");
    const navHeight = document.querySelector("nav").offsetHeight;
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", 
            link.getAttribute("href") === `#${currentSection}`);
    });
}, 100));

// Fade-in Animation and Scroll Prevention
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    document.querySelectorAll(".section").forEach(section => {
        Object.assign(section.style, {
            opacity: "0",
            transition: "opacity 1s ease-in-out",
            willChange: "opacity"
        });
        observer.observe(section);
    });

    // Prevent iframe scroll trapping
    const iframe = document.querySelector(".rsvp-iframe");
    if (iframe) {
        iframe.addEventListener("load", () => {
            iframe.style.height = "1300px"; // Match CSS base height
            // Inject CSS to disable scrolling in iframe content
            const disableScroll = `
                <style>
                    body { 
                        overflow: hidden !important; 
                        height: 100% !important; 
                        position: fixed !important; 
                    }
                </style>
            `;
            try {
                iframe.contentDocument.head.insertAdjacentHTML("beforeend", disableScroll);
            } catch (e) {
                console.warn("Could not modify iframe content:", e);
            }
        });

        // Prevent scroll events from being captured by iframe
        iframe.addEventListener("wheel", (e) => {
            e.preventDefault();
            window.scrollBy(0, e.deltaY);
        }, { passive: false });

        iframe.addEventListener("touchmove", (e) => {
            e.preventDefault();
            window.scrollBy(0, -e.touches[0].clientY + iframe.lastTouchY);
            iframe.lastTouchY = e.touches[0].clientY;
        }, { passive: false });

        iframe.addEventListener("touchstart", (e) => {
            iframe.lastTouchY = e.touches[0].clientY;
        }, { passive: false });
    }
});

// Maps Function
function openMaps(e) {
    e.preventDefault();
    const address = "Crispy's Springfield Gallery, 1735 N Main St, Jacksonville, FL 32206";
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const url = isIOS 
        ? `maps://maps.apple.com/?q=${encodedAddress}`
        : `https://maps.google.com/?q=${encodedAddress}`;

    const newWindow = window.open(url, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
        alert("Unable to open maps. Search manually: " + address);
    }
}

document.querySelector(".maps-btn")?.addEventListener("click", openMaps);

// Error checking
document.addEventListener("DOMContentLoaded", () => {
    const requiredIds = ["days", "hours", "minutes", "seconds", "countdown"];
    requiredIds.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`Required element #${id} not found in DOM`);
        }
    });
});
