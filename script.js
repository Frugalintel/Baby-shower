// Set the date for the baby shower (format: year, month-1, day, hour, minute)
// Note: Month is 0-indexed (0 = January, 11 = December)
const babyShowerDate = new Date(2023, 9, 15, 14, 0, 0);

// Set the date we're counting down to
const countdownDate = new Date("May 17, 2025 11:30:00").getTime();

// Countdown Timer
function updateCountdown() {
    const currentDate = new Date();
    const difference = babyShowerDate - currentDate;
    
    // If the date has passed, show zeros
    if (difference < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
    document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
}

// Update the countdown every 1 second
const countdown = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the countdown date
    const distance = countdownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the results
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    // If the countdown is finished, display expired message
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "The baby shower has begun!";
    }
}, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        window.requestAnimationFrame(step);
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }
        
        // Easing function
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }
    });
});

// Form handling function - JavaScript fallback when FormSubmit fails
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('rsvp-form');
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const guests = form.elements['guests'].value;
    const attending = form.querySelector('input[name="attending"]:checked').value;
    const message = form.elements['message'].value;
    
    // Log form data for debug purposes
    console.log('RSVP Form Submission:', {
        name,
        email,
        guests,
        attending,
        message
    });
    
    // Attempt to send form to FormSubmit as a backup
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('guests', guests);
    formData.append('attending', attending);
    formData.append('message', message);
    
    // Try to send the form data using fetch
    fetch('https://formsubmit.co/jaydensaxton.c@outlook.com', {
        method: 'POST',
        body: formData
    }).catch(error => {
        console.error('Error:', error);
    });
    
    // Show confirmation message
    form.style.display = 'none';
    document.getElementById('confirmation').classList.remove('hidden');
    
    // Redirect to thanks page
    setTimeout(() => {
        window.location.href = 'thanks.html';
    }, 2000);
}

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add custom styles for active nav links
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        color: var(--primary-color);
    }
    
    nav a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s ease-in-out';
        observer.observe(section);
    });
    
    // Add fade-in animation styles
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .fade-in {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(fadeStyle);
}); 