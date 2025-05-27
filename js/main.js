/**
 * Main JavaScript file for portfolio website
 * Handles all interactive functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initializing...');

    // ========================================
    // PRELOADER
    // ========================================
    function initPreloader() {
        // Disable scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.classList.add('fade-out');
                // Enable scrolling after preloader disappears
                setTimeout(function() {
                    document.body.style.overflow = 'auto';
                    preloader.style.display = 'none';
                }, 500);
            } else {
                // If no preloader exists, enable scrolling immediately
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ========================================
    // VIDEO ERROR HANDLING
    // ========================================
    function initVideoHandling() {
        // About section video handling
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

        // Handle all videos on the page
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            video.addEventListener('error', function() {
                console.warn('Video failed to load:', this.src);
                // Try to find a fallback image
                const container = this.closest('.video-container, .project-image, .gallery-image');
                if (container) {
                    const fallback = container.querySelector('.video-fallback, img[data-fallback]');
                    if (fallback) {
                        this.style.display = 'none';
                        fallback.style.display = 'block';
                    }
                }
            });

            video.addEventListener('loadeddata', function() {
                this.classList.add('loaded');
            });
        });
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    function initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ========================================
    // MOBILE MENU
    // ========================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (!menuToggle || !mainNav) return;

        // Mobile Menu Toggle
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Update aria attributes for accessibility
            const isOpen = this.classList.contains('active');
            this.setAttribute('aria-expanded', isOpen);
            mainNav.setAttribute('aria-hidden', !isOpen);
        });

        // Mobile menu dropdown handling
        const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                // Only handle dropdown on mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const dropdown = parent.querySelector('.dropdown');
                    
                    if (!dropdown) return;

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
                
                // Update aria attributes
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // ========================================
    // HERO SLIDER
    // ========================================
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (slides.length === 0) return;

        let currentSlide = 0;
        let slideInterval;

        // Initialize the slider
        function initSlider() {
            // Set the first slide as active
            if (slides[0]) slides[0].classList.add('active');
            if (dots[0]) dots[0].classList.add('active');
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
            if (index < 0 || index >= slides.length) return;

            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to the current slide and dot
            if (slides[index]) slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');

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
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Add event listeners for slider dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Pause slider on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroSlider.addEventListener('mouseleave', () => {
                startSlideInterval();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Initialize the slider
        initSlider();
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '#!') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Close mobile menu if open
                    const mainNav = document.querySelector('.main-nav');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }

                    // Calculate header offset
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    // Scroll to the target element
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // LAZY LOADING
    // ========================================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-load, [data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.setAttribute('src', src);
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                }
            });
        }
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll, .fade-in');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated', 'visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(element => {
                animationObserver.observe(element);
            });
        } else {
            // Fallback for older browsers
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
                        element.classList.add('animated', 'visible');
                    }
                });
            }

            // Check elements on load
            checkIfInView();

            // Performance optimization for scroll events
            let scrollTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    checkIfInView();
                }, 20);
            });
        }
    }

    // ========================================
    // PROJECT CARDS HOVER EFFECTS
    // ========================================
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const projectInfo = this.querySelector('.project-info');
                if (projectInfo) {
                    projectInfo.style.transform = 'translateY(-10px)';
                }
            });

            card.addEventListener('mouseleave', function() {
                const projectInfo = this.querySelector('.project-info');
                if (projectInfo) {
                    projectInfo.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // ========================================
    // ACCESSIBILITY
    // ========================================
    function initAccessibility() {
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                // Enter key for buttons and links
                if (e.key === 'Enter' && (this.tagName === 'BUTTON' || this.tagName === 'A')) {
                    if (!this.href || this.href.startsWith('#')) {
                        e.preventDefault();
                        this.click();
                    }
                }
                // Space key for buttons
                if (e.key === ' ' && this.tagName === 'BUTTON') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    function initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top') || document.querySelector('.back-to-top');
        if (!backToTopButton) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        backToTopButton.classList.add('visible');
                    } else {
                        backToTopButton.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // RESIZE HANDLER
    // ========================================
    function initResizeHandler() {
        window.addEventListener('resize', function() {
            // Adjust mobile menu
            const mainNav = document.querySelector('.main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (window.innerWidth > 992 && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ========================================
    // INITIALIZE ALL FUNCTIONS
    // ========================================
    try {
        initPreloader();
        initVideoHandling();
        initHeader();
        initMobileMenu();
        initHeroSlider();
        initSmoothScroll();
        initLazyLoading();
        initScrollAnimations();
        initProjectCards();
        initAccessibility();
        initBackToTop();
        initResizeHandler();
        
        console.log('Portfolio website initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio website:', error);
    }

}); // This closes the DOMContentLoaded event listener
