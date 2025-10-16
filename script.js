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
    } else {
        themeIcon.textContent = '🌙';
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
    // Screenshot Zoom/Lightbox Functionality
    // ================================
    
    function createLightbox() {
        // Check if lightbox already exists
        if (document.getElementById('imageLightbox')) {
            return;
        }
        
        const lightbox = document.createElement('div');
        lightbox.id = 'imageLightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 3000;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        lightbox.innerHTML = `
            <button id="closeLightbox" style="
                position: absolute;
                top: 20px;
                right: 30px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                border: none;
                color: white;
                font-size: 3rem;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3001;
                line-height: 1;
                padding: 0;
            ">×</button>
            <img id="lightboxImage" style="
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            " src="" alt="Zoomed screenshot">
            <p id="lightboxCaption" style="
                position: absolute;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                background: rgba(0, 0, 0, 0.7);
                padding: 1rem 2rem;
                border-radius: 30px;
                backdrop-filter: blur(10px);
            "></p>
        `;
        
        document.body.appendChild(lightbox);
        
        const closeBtn = document.getElementById('closeLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        
        // Hover effect for close button
        closeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(90deg)';
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.5)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
        
        // Close button functionality
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'imageLightbox') {
                closeLightbox();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
        
        // Animate image when it loads
        lightboxImg.addEventListener('load', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 10);
        });
    }
    
    function openLightbox(imageSrc, caption) {
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        
        lightbox.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Add click handlers to all screenshot images
    function initializeScreenshotZoom() {
        const screenshotItems = document.querySelectorAll('.screenshot-item');
        
        screenshotItems.forEach(item => {
            const img = item.querySelector('img');
            const caption = item.querySelector('p');
            
            if (img) {
                img.style.cursor = 'zoom-in';
                img.style.transition = 'transform 0.3s ease';
                
                // Add hover effect
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
                
                // Add click handler
                img.addEventListener('click', () => {
                    openLightbox(img.src, caption ? caption.textContent : '');
                });
            }
        });
    }
    
    // Initialize lightbox
    createLightbox();
    initializeScreenshotZoom();
    
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
