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

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Initialize the testimonial slider
    function initTestimonialSlider() {
        if (testimonials.length === 0) return;
        
        // Set the first testimonial as active
        testimonials[0].classList.add('active');
        testimonialDots[0].classList.add('active');
        
        // Start the automatic slideshow
        startTestimonialInterval();
    }

    // Start automatic testimonial slideshow
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    // Reset the testimonial interval when manually changing
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    // Go to a specific testimonial
    function goToTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to the current testimonial and dot
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        // Update the current testimonial index
        currentTestimonial = index;
        
        // Reset the interval
        resetTestimonialInterval();
    }

    // Go to the next testimonial
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        goToTestimonial(nextIndex);
    }

    // Add event listeners for testimonial dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
    });

    // Initialize the testimonial slider if it exists on the page
    if (testimonials.length > 0) {
        initTestimonialSlider();
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
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check elements on load
    checkIfInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const parallaxOffset = scrollPosition * 0.4;
                const activeSlide = document.querySelector('.slide.active .slide-bg');
                if (activeSlide) {
                    activeSlide.style.transform = `scale(1) translateY(${parallaxOffset}px)`;
                }
            }
        });
    }

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
