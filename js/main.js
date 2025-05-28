// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect (PERFECT - already working!)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add hamburger animation
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Enhanced dropdown functionality for both desktop and mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        let timeout;

        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                clearTimeout(timeout);
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }, 150);
            }
        });

        // Mobile click behavior
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isOpen = menu.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        m.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    if (!isOpen) {
                        menu.classList.add('active');
                    }
                }
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.parallax-element');
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.fade-in-element, .project-card, .service-item').forEach(el => {
        observer.observe(el);
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple form validation
            const requiredFields = ['name', 'email', 'service', 'message'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = 'rgb(218, 207, 202)';
                }
            });

            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#e74c3c';
            }

            if (isValid) {
                // Show success message
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#27ae60';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '#333222';
                }, 3000);

                // Here you would typically send the data to your server
                console.log('Form submitted:', formObject);
            } else {
                // Show error message
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Please fill all required fields';
                submitButton.style.background = '#e74c3c';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '#333222';
                }, 3000);
            }
        });
    }

    // Preloader functionality
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'visible';
                }, 500);
            });
        }
    }

    // Custom cursor effect (luxury touch)
    function initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    // Section reveal animations
    const revealSections = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 100;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('section-visible');
            }
        });
    };

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.cta-button, .secondary-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Initialize hero animations
    function initHeroAnimations() {
        const heroElements = [
            { element: document.querySelector('.hero-title'), delay: 300 },
            { element: document.querySelector('.hero-subtitle'), delay: 600 },
            { element: document.querySelector('.cta-button'), delay: 900 }
        ];

        heroElements.forEach(({ element, delay }) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }

    // Performance optimization: Debounce scroll events
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

    // Advanced image lazy loading
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Advanced scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', debounce(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressBarFill = document.querySelector('.scroll-progress-bar');
            if (progressBarFill) {
                progressBarFill.style.width = scrollPercent + '%';
            }
        }, 10));
    }

    // Enhanced project filtering
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects with animation
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Advanced form validation with real-time feedback
    function initAdvancedFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let errorMessage = '';

            // Remove existing error styling
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Validation rules
            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters long';
                    }
                    break;
            }

            if (!isValid) {
                field.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errorMessage;
                field.parentNode.appendChild(errorDiv);
            }

            return isValid;
        }
    }

    // Theme switcher functionality
    function initThemeSwitcher() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animate the transition
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Advanced search functionality
    function initSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        function performSearch(query) {
            const searchableElements = document.querySelectorAll('[data-searchable]');
            const results = [];

            searchableElements.forEach(element => {
                const content = element.textContent.toLowerCase();
                if (content.includes(query)) {
                    results.push({
                        title: element.dataset.title || element.textContent.substring(0, 50),
                        element: element
                    });
                }
            });

            displaySearchResults(results);
        }

        function displaySearchResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<p>No results found</p>';
            } else {
                searchResults.innerHTML = results.map(result => 
                    `<div class="search-result-item" data-target="${result.element.id}">
                        ${result.title}
                    </div>`
                ).join('');
            }
            
            searchResults.style.display = 'block';
        }
    }

    // Performance monitoring
    function logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('🚀 Performance Metrics:', {
                        'Page Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms',
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms',
                        'First Paint': Math.round(performance.getEntriesByType('paint')[0]?.startTime) + 'ms'
                    });
                }, 0);
            });
        }
    }

    // Initialize everything when page loads
    window.addEventListener('load', function() {
        initHeroAnimations();
        document.body.classList.add('loaded');
    });

    // Initialize all functions
    initPreloader();
    initCustomCursor();
    initLazyLoading();
    initScrollProgress();
    initProjectFiltering();
    initAdvancedFormValidation();
    initThemeSwitcher();
    initSearchFunctionality();
    logPerformanceMetrics();

    // Add scroll event listeners
    window.addEventListener('scroll', revealSections);
    revealSections(); // Run once on load

    console.log('✨ Luxury Portfolio Website Initialized Successfully');
    console.log('✨ All Advanced Features Initialized Successfully');
});
