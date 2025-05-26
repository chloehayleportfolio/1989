// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        // Enable scrolling after preloader disappears
        setTimeout(function() {
            document.body.style.overflow = 'auto';
            preloader.style.display = 'none';
        }, 500);
    });

    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Video error handling for About section
    const aboutVideo = document.querySelector('.about-image video');
    const fallbackImage = document.querySelector('.video-fallback');

    if (aboutVideo) {
        aboutVideo.addEventListener('error', function() {
            console.log('Video failed to load, showing fallback image');
            aboutVideo.style.display = 'none';
            if (fallbackImage) {
                fallbackImage.style.display = 'block';
            }
        });
        
        aboutVideo.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            aboutVideo.classList.add('loaded');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Mobile menu dropdown handling
    const dropdownToggle = document.querySelectorAll('.has-dropdown > a');
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle dropdown on mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdown = parent.querySelector('.dropdown');
                // Close all other open dropdowns first
                document.querySelectorAll('.has-dropdown .dropdown.show').forEach(openDropdown => {
                    if (openDropdown !== dropdown) {
                        openDropdown.classList.remove('show');
                    }
                });
                // Toggle current dropdown
                dropdown.classList.toggle('show');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') &&
            !event.target.closest('.main-nav') &&
            !event.target.closest('.menu-toggle')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Initialize the slider
    function initSlider() {
        // Set the first slide as active
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        // Start the automatic slideshow
        startSlideInterval();
    }

    // Start automatic slideshow
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    // Reset the interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Go to a specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        // Add active class to the current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        // Update the current slide index
        currentSlide = index;
        // Reset the interval
        resetInterval();
    }

    // Go to the next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }

    // Go to the previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        goToSlide(prevIndex);
    }

    // Add event listeners for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Add event listeners for slider dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Initialize the slider if it exists on the page
    if (slides.length > 0) {
        initSlider();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);
            img.classList.add('loaded');
        });
    }

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            // Check if element is in viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            }
        });
    }

    // Check elements on load
    checkIfInView();

    // Performance optimization for scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Clear the timeout if it has already been set
        clearTimeout(scrollTimeout);
        // Set a timeout to run after scrolling ends
        scrollTimeout = setTimeout(function() {
            checkIfInView();
        }, 20);
    });

    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-info').style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-info').style.transform = 'translateY(0)';
        });
    });

    // Add keyboard navigation support for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            // Enter key for buttons and links
            if (e.key === 'Enter' && (this.tagName === 'BUTTON' || this.tagName === 'A')) {
                e.preventDefault();
                this.click();
            }
            // Space key for buttons
            if (e.key === ' ' && this.tagName === 'BUTTON') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Add resize event listener for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust mobile menu
    const mainNav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
