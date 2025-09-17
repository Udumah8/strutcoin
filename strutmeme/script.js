// Toast notification system
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
    }

    show(title, description = '', type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            ${description ? `<div class="toast-description">${description}</div>` : ''}
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            this.remove(toast);
        }, 4000);
        
        return toast;
    }
    
    remove(toast) {
        toast.style.animation = 'toast-slide-out 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Initialize toast manager
const toast = new ToastManager();

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Airdrop form handler
function initializeAirdropForm() {
    const form = document.getElementById('airdrop-form');
    const emailInput = document.getElementById('email-input');
    
    if (form && emailInput) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                toast.show('Error', 'Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                toast.show('Error', 'Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate successful signup
            toast.show('Success! 🎉', "You're signed up for the STRUT airdrop!");
            emailInput.value = '';
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card-meme, .roadmap-card, .gallery-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add hover effects to buttons
function initializeButtonEffects() {
    document.querySelectorAll('.btn-hero').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add parallax effect to hero background
function initializeParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Add click handlers for CTA buttons
function initializeCTAButtons() {
    const buyButton = document.querySelector('.btn-hero.primary');
    const airdropButtons = document.querySelectorAll('.btn-hero.secondary');
    
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            toast.show('CA', '5P1jUoxxdYyYieWEVko3UaYngwNoZyhCKe1bapFfrge');
        });
    }
    
    airdropButtons.forEach(button => {
        if (button.textContent.includes('Join Airdrop')) {
            button.addEventListener('click', function() {
                const airdropSection = document.querySelector('.airdrop-section');
                if (airdropSection) {
                    airdropSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

// Add typing animation to hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Initialize counters for tokenomics
function initializeCounters() {
    const percentages = document.querySelectorAll('.breakdown-percentage');
    
    percentages.forEach(element => {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 50);
    });
}

// Add floating animation to mascot images
function initializeMascotAnimations() {
    const mascotImages = document.querySelectorAll('.mascot-image, .gallery-image');
    
    mascotImages.forEach((img, index) => {
        // Add slight delay to each image for staggered animation
        img.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Handle loading states
function initializeLoadingStates() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAirdropForm();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeButtonEffects();
    initializeParallaxEffect();
    initializeCTAButtons();
    initializeTypingAnimation();
    initializeMascotAnimations();
    initializeLoadingStates();
    
    // Initialize counters after a delay to ensure visibility
    setTimeout(initializeCounters, 1000);
    
    console.log('🎉 Strut Master Coin website loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate parallax on resize
    initializeParallaxEffect();
});

// Add custom cursor effect for buttons
document.addEventListener('mousemove', function(e) {
    const buttons = document.querySelectorAll('.btn-hero');
    
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// Export for potential use in other scripts
window.StrutMaster = {
    toast,
    isValidEmail,
    initializeAirdropForm,
    initializeSmoothScrolling,
    initializeScrollAnimations

};
