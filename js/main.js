// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Preloader
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    // Prevent scrolling while preloader is visible
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        preloader.classList.add('hidden');
        // Allow scrolling again
        document.body.style.overflow = '';
        // Remove from DOM after fade out
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 600); // match your CSS transition duration
    }, 2000); // 2000ms = 2 seconds, change as needed
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Typing Animation
const typed = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

if (typed && cursor) {
    const words = ['Web Developer','Frontend Developer','Full-Stack Developer','AI Enthusiast','Software Engineer'];
    const typingDelay = 100;
    const erasingDelay = 70;
    const newWordDelay = 2000;
    let wordIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < words[wordIndex].length) {
            if (!cursor.classList.contains('typing')) {
                cursor.classList.add('typing');
            }
            typed.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursor.classList.remove('typing');
            setTimeout(erase, newWordDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursor.classList.contains('typing')) {
                cursor.classList.add('typing');
            }
            typed.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursor.classList.remove('typing');
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, newWordDelay);
    });
}

// Enhanced Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initialize animations
    const animateItems = () => {
        portfolioItems.forEach(item => {
            // Reset any inline styles
            item.style.opacity = '';
            item.style.transform = '';
            
            // Ensure AOS is refreshed
            if (window.AOS) {
                window.AOS.refresh();
            }
        });
    };
    
    // Filter function
    const filterPortfolio = (category) => {
        portfolioItems.forEach(item => {
            const shouldShow = category === 'all' || item.classList.contains(category);
            
            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            filterPortfolio(filterValue);
        });
    });
    
    // Initialize items
    animateItems();
    
    // View More button functionality
    const viewMoreBtn = document.querySelector('.view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // This would typically load more projects
            // For demo purposes, you could toggle a class to show hidden projects
            alert('This would load more portfolio projects in a real implementation.');
        });
    }

    // Ensure portfolio text is visible
    portfolioItems.forEach(item => {
        // Add slight initial opacity to overlays for better text visibility
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            // Already set in CSS now
        }
        
        // Fix for Safari which sometimes has backdrop-filter issues
        const tags = item.querySelectorAll('.portfolio-tag');
        tags.forEach(tag => {
            tag.style.backgroundColor = window.getComputedStyle(tag).backgroundColor;
        });
    });

    // Set default visible state for portfolio items
    portfolioItems.forEach(item => {
        // Show info by default for a moment then fade
        const info = item.querySelector('.portfolio-info');
        if (info) {
            // Make info briefly visible on page load then hide
            info.style.opacity = '1';
            info.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                // Return to initial state after brief display
                info.style.opacity = '';
                info.style.transform = '';
            }, 1500);
        }
        
        // Increase contrast for light images
        const img = item.querySelector('.portfolio-img img');
        if (img) {
            img.addEventListener('load', () => {
                // Optional: add a very subtle filter to images to improve text readability
                img.style.filter = 'brightness(0.95) contrast(1.05)';
            });
        }
    });
});

// Skill Bar Animation
const skillPers = document.querySelectorAll('.skill-per');

function animateSkills() {
    skillPers.forEach(skillPer => {
        const percentage = skillPer.getAttribute('per');
        skillPer.style.width = percentage + '%';
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger skill animation when skills section is in viewport
window.addEventListener('scroll', () => {
    const skills = document.querySelector('.skills');
    if (skills && isInViewport(skills)) {
        animateSkills();
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (basic validation)
        if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If validation passes, you would normally send the form data to a server
        // For demo purposes, just show a success message
        alert('Your message has been sent successfully!');
        contactForm.reset();
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for responsive mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 0;
                right: -280px;
                width: 280px;
                height: 100vh;
                background: var(--white-color);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-top: 50px;
                transition: 0.5s;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 999;
            }
            
            .nav-links.open {
                right: 0;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .menu-btn {
                display: block;
                z-index: 1000;
                margin-left: auto;
            }
            
            .theme-toggle {
                position: fixed;
                top: 20px;
                right: 80px;
                z-index: 1000;
            }
        }
        
        @media (max-width: 992px) {
            .hero-content, .about-content {
                flex-direction: column;
                text-align: center;
            }
            
            .text-content {
                padding-right: 0;
                margin-bottom: 50px;
            }
            
            .cta-buttons, .social-icons {
                justify-content: center;
            }
            
            .hero-img-container, .img-container {
                margin: 0 auto;
            }
            
            .about-text {
                margin-top: 50px;
            }
            
            .contact-content {
                flex-direction: column;
            }
            
            .contact-info, .contact-form {
                width: 100%;
                margin-bottom: 40px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Reveal animation for skill bars
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            animateSkills();
        }
    }
});

// Add responsive CSS to complete the missing styles in your CSS file
document.addEventListener('DOMContentLoaded', () => {
    const complementaryStyles = document.createElement('style');
    complementaryStyles.textContent = `
        /* Complete portfolio styling */
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .portfolio-item {
            position: relative;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
            transition: all 0.5s ease;
        }
        
        .portfolio-img {
            overflow: hidden;
        }
        
        .portfolio-img img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .portfolio-item:hover .portfolio-img img {
            transform: scale(1.1);
        }
        
        .portfolio-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 20px;
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(100%);
            transition: transform 0.5s ease;
        }
        
        .portfolio-item:hover .portfolio-info {
            transform: translateY(0);
        }
        
        .portfolio-info h3 {
            margin-bottom: 5px;
            color: var(--dark-color);
        }
        
        .portfolio-info p {
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .portfolio-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            color: var(--white-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .portfolio-link:hover {
            background: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        /* Contact styling */
        .contact-content {
            display: flex;
            gap: 40px;
        }
        
        .contact-info {
            flex: 1;
        }
        
        .contact-detail {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .contact-detail i {
            width: 50px;
            height: 50px;
            background: var(--light-color);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            color: var(--primary-color);
            margin-right: 20px;
            transition: var(--transition);
        }
        
        .contact-detail:hover i {
            background: var(--primary-color);
            color: var(--white-color);
        }
        
        .contact-detail h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }
        
        .contact-form {
            flex: 1;
            background: var(--white-color);
            padding: 30px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 15px;
            border: 1px solid #e6e6e6;
            border-radius: var(--border-radius);
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            transition: var(--transition);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: var(--primary-color);
            outline: none;
        }
        
        .form-group textarea {
            resize: none;
            height: 150px;
        }
        
        /* Footer styling */
        footer {
            background: var(--dark-color);
            color: var(--white-color);
            padding: 30px 0;
            text-align: center;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .back-to-top {
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: var(--transition);
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            background: var(--secondary-color);
        }
        
        /* Additional responsive styles */
        @media (max-width: 576px) {
            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .hero-content h2 {
                font-size: 1.5rem;
            }
            
            .hero-img-container, .img-container {
                width: 300px;
                height: 300px;
            }
            
            .cta-buttons {
                flex-direction: column;
                gap: 15px;
            }
            
            .cta-buttons a {
                width: 100%;
                text-align: center;
            }
            
            .section-header h2 {
                font-size: 2rem;
            }
            
            .portfolio-filter {
                flex-direction: column;
                align-items: center;
            }
            
            .filter-btn {
                width: 100%;
                margin-bottom: 10px;
            }
            
            .contact-form {
                padding: 20px;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 20px;
            }
        }
    `;
    document.head.appendChild(complementaryStyles);
});

// Add smooth transition for theme changes
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Theme Toggle Functionality - Class Toggle Version
// Remove previous theme toggle logic and replace with class toggling

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    // Check for saved theme preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    // Set initial theme
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }

    // Toggle theme when checkbox is clicked
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});

// Remove any existing mouse movement effects for both hero and about images
document.addEventListener('DOMContentLoaded', () => {
    // Find containers and remove movement effects
    const heroContainer = document.querySelector('.hero-img-container');
    const aboutContainer = document.querySelector('.about-img-container');
    
    if (heroContainer) {
        heroContainer.style.transform = '';
    }
    
    if (aboutContainer) {
        aboutContainer.style.transform = '';
    }
}); 