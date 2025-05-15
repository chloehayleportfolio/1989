

// Redirect to main.js
console.log("script.js is deprecated, please use main.js instead");

// Import the main.js functionality
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            
            // Enable scrolling after preloader disappears
            setTimeout(function() {
                document.body.style.overflow = 'auto';
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Basic mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
});
