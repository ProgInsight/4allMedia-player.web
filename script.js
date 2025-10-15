// ================================
// 4allMedia Player - Interactive JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Theme Toggle Functionality
    // ================================
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
            
            // Add rotation animation
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    // ================================
    // Documentation Navigation
    // ================================
    
    const navItems = document.querySelectorAll('.nav-item');
    const docSections = document.querySelectorAll('.doc-section');
    
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                docSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Show corresponding section
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Smooth scroll to top of content area
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // ================================
    // Smooth Scrolling for Anchor Links
    // ================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a documentation nav item (already handled above)
            if (this.classList.contains('nav-item')) {
                return;
            }
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ================================
    // Navbar Background on Scroll
    // ================================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        }
    });
    
    // ================================
    // Animate Elements on Scroll
    // ================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe screenshot items
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    screenshotItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // ================================
    // Add Hover Effects to Buttons
    // ================================
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ================================
    // Feature Card Icon Animation
    // ================================
    
    const featureIcons = document.querySelectorAll('.feature-card .icon');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 0.5s ease';
            }, 10);
        });
    });
    
    // ================================
    // Particles Background Effect (Optional Enhancement)
    // ================================
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.opacity = '0';
        particle.style.transition = 'all 2s ease';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
        }, 10);
        
        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 2000);
        }, 2000);
    }
    
    // Create particles occasionally
    setInterval(createParticle, 500);
    
    // ================================
    // Mobile Menu Toggle (for responsive design)
    // ================================
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    menuToggle.style.fontSize = '2rem';
    menuToggle.style.cursor = 'pointer';
    menuToggle.style.color = 'white';
    
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        navbar.appendChild(menuToggle);
        menuToggle.style.display = 'block';
        navLinksContainer.style.display = 'none';
    }
    
    menuToggle.addEventListener('click', function() {
        if (navLinksContainer.style.display === 'none' || navLinksContainer.style.display === '') {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '100%';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.background = 'rgba(26, 26, 46, 0.98)';
            navLinksContainer.style.padding = '1rem';
            navLinksContainer.style.borderRadius = '0 0 10px 10px';
        } else {
            navLinksContainer.style.display = 'none';
        }
    });
    
    // ================================
    // Handle Window Resize
    // ================================
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'row';
            navLinksContainer.style.position = 'relative';
            navLinksContainer.style.background = 'transparent';
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = 'block';
            navLinksContainer.style.display = 'none';
        }
    });
    
    // ================================
    // Dynamic Color Change on Scroll (Hero Section)
    // ================================
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const hue = (scrollPosition / 5) % 360;
            hero.style.filter = `hue-rotate(${hue}deg)`;
        });
    }
    
    // ================================
    // Add Loading Animation for Images
    // ================================
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 10);
        });
    });
    
    // ================================
    // Easter Egg: Konami Code
    // ================================
    
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 3s infinite';
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        alert('🎉 You found the secret! Enjoy the rainbow mode!');
    }
    
    // ================================
    // Console Welcome Message
    // ================================
    
    console.log('%c🎵 Welcome to 4allMedia Player! 🎵', 'font-size: 20px; color: #ff6b6b; font-weight: bold;');
    console.log('%cBuilt with ❤️ for media lovers', 'font-size: 14px; color: #4ecdc4;');
    console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #ffe66d;');
});

// ================================
// Performance Optimization
// ================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll event
const debouncedScroll = debounce(function() {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);
