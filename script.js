// Loading animation
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 500);
    }, 1200);
});

// Background particles animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    // Random colors for particles
    const colors = ['rgba(255, 193, 7, 0.6)', 'rgba(255, 107, 107, 0.5)', 'rgba(107, 207, 127, 0.5)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('backgroundAnimation').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

setInterval(createParticle, 300);

// Add entrance animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (!section.querySelector('.loading-overlay')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    }
});

// Social link hover effects
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    const icon = link.querySelector('.social-icon');
    
    link.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.color = '#ff6b6b';
    });
    
    link.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
        icon.style.color = '#ffd93d';
    });
});

// Profile image interaction
const profileImage = document.getElementById('profileImage');

profileImage.addEventListener('click', () => {
    profileImage.style.transform = 'scale(1.1) rotate(360deg)';
    setTimeout(() => {
        profileImage.style.transform = 'scale(1)';
    }, 500);
});

// Update stats with animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numValue = parseInt(finalValue.replace(/\D/g, ''));
        let currentValue = 0;
        const increment = Math.ceil(numValue / 50);
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = currentValue + (finalValue.includes('K') ? 'K+' : '+');
            }
        }, 30);
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Dynamic greeting based on time
function setDynamicGreeting() {
    const hero = document.querySelector('.hero h1');
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good Morning, Welcome to My Frequency';
    } else if (hour < 18) {
        greeting = 'Good Afternoon, Welcome to My Frequency';
    } else {
        greeting = 'Good Evening, Welcome to My Frequency';
    }
    
    hero.textContent = greeting;
}

// Set greeting on load
window.addEventListener('load', setDynamicGreeting);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add pulse effect to contact button
const contactButton = document.querySelector('.contact-button');

setInterval(() => {
    contactButton.style.boxShadow = '0 20px 50px rgba(255, 107, 107, 0.8)';
    setTimeout(() => {
        contactButton.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.3)';
    }, 1000);
}, 5000);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);