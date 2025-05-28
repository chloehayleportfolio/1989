// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Active navigation highlighting based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced scroll handler with parallax effects
const throttledScrollHandler = throttle(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for hero image
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const speed = scrolled * 0.3;
        heroImage.style.transform = `translateY(${speed}px)`;
    }

    // Parallax for other elements
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
        const speed = scrolled * 0.5;
        element.style.transform = `translateY(${speed}px)`;
    });
    
    // Update active navigation
    updateActiveNavigation();
}, 16); // ~60fps

// Apply scroll event listener
window.addEventListener('scroll', throttledScrollHandler);

// Mobile menu toggle with enhanced animations
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Enhanced smooth scrolling for anchor links
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

// Enhanced dropdown functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    
    if (dropdownMenu) {
        // Desktop hover behavior
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });

            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            });
        }
        
        // Mobile click behavior
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-element').forEach(el => {
    fadeInObserver.observe(el);
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        
        // Enhanced overlay animation
        const overlay = this.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
            overlay.style.opacity = '1';
        }
        
        // Image zoom effect
        const image = this.querySelector('.project-image img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
        
        const overlay = this.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
            overlay.style.opacity = '0';
        }
        
        const image = this.querySelector('.project-image img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
    
    // Click handler for project details
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project-id');
        if (projectId) {
            showProjectModal(projectId);
        }
    });
});

// Enhanced service card animations
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
        
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        
        // Add shimmer effect
        const shimmer = this.querySelector('::before');
        if (shimmer) {
            this.style.setProperty('--shimmer-position', '100%');
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
        
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Enhanced contact form handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const projectType = formData.get('project-type');
        const budget = formData.get('budget');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!name || !email || !projectType || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (phone && !isValidPhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Simulate form submission with loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <div class="loading-spinner-small"></div>
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            
            // Analytics tracking (if needed)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: projectType
                });
            }
        }, 2000);
    });
}

// Enhanced validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        removeNotification(notification);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        min-width: 300px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 1.25rem 1.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${getNotificationColor(type)};
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #999;
        cursor: pointer;
        margin-left: auto;
        transition: color 0.3s ease;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove and close button functionality
    const autoRemoveTimer = setTimeout(() => removeNotification(notification), duration);
    
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemoveTimer);
        removeNotification(notification);
    });
    
    // Pause auto-remove on hover
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemoveTimer);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => removeNotification(notification), 2000);
    });
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#333222'
    };
    return colors[type] || colors.info;
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.setAttribute('data-loaded', 'true');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Media upload functionality
function initializeMediaUpload() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        const placeholder = item.querySelector('.media-placeholder');
        if (placeholder) {
            // Create hidden file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            fileInput.multiple = true;
            
            // Set accepted file types based on media type
            const mediaType = item.querySelector('p').textContent;
            if (mediaType.includes('Images')) {
                fileInput.accept = 'image/*';
            } else if (mediaType.includes('Videos')) {
                fileInput.accept = 'video/mp4';
            } else if (mediaType.includes('Documents')) {
                fileInput.accept = 'application/pdf';
            }
            
            item.appendChild(fileInput);
            
            // Click to upload
            placeholder.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Drag and drop
            placeholder.addEventListener('dragover', (e) => {
                e.preventDefault();
                placeholder.style.background = 'rgba(218, 207, 202, 0.1)';
                placeholder.style.borderColor = '#333222';
            });
            
            placeholder.addEventListener('dragleave', () => {
                placeholder.style.background = '';
                placeholder.style.borderColor = '';
            });
            
            placeholder.addEventListener('drop', (e) => {
                e.preventDefault();
                placeholder.style.background = '';
                placeholder.style.borderColor = '';
                handleFileUpload(e.dataTransfer.files, item);
            });
            
            fileInput.addEventListener('change', (e) => {
                handleFileUpload(e.target.files, item);
            });
        }
    });
}

function handleFileUpload(files, container) {
    Array.from(files).forEach(file => {
        if (validateFile(file, container)) {
            displayUploadedFile(file, container);
            showNotification(`Successfully uploaded: ${file.name}`, 'success');
        } else {
            showNotification(`Invalid file type: ${file.name}`, 'error');
        }
    });
}

function validateFile(file, container) {
    const mediaType = container.querySelector('p').textContent;
    
    if (mediaType.includes('Images')) {
        return file.type.startsWith('image/');
    } else if (mediaType.includes('Videos')) {
        return file.type === 'video/mp4';
    } else if (mediaType.includes('Documents')) {
        return file.type === 'application/pdf';
    }
    
    return false;
}

function displayUploadedFile(file, container) {
    const placeholder = container.querySelector('.media-placeholder');
    
    // Create preview element
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 0.8rem;
        color: #333222;
        backdrop-filter: blur(10px);
    `;
    preview.textContent = file.name;
    
    placeholder.style.position = 'relative';
    placeholder.appendChild(preview);
    
    // Change placeholder appearance
    placeholder.style.borderColor = '#28a745';
    placeholder.style.background = 'rgba(40, 167, 69, 0.05)';
}

// Project modal functionality
function showProjectModal(projectId) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-body">
                    <h2>Project Details</h2>
                    <p>Loading project information...</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 12px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            margin: 2rem;
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            color: #999;
            cursor: pointer;
            z-index: 1;
        }
        
        .modal-body {
            padding: 3rem;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Escape key to close
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Load project data (simulate API call)
    setTimeout(() => {
        loadProjectData(projectId, modal.querySelector('.modal-body'));
    }, 500);
}

function loadProjectData(projectId, container) {
    // Simulate project data loading
    const projectData = {
        'interior-1': {
            title: 'Luxury Penthouse Design',
            description: 'A sophisticated interior design project featuring modern luxury elements with timeless elegance.',
            images: ['project1-1.jpg', 'project1-2.jpg', 'project1-3.jpg'],
            details: 'This project involved complete renovation of a 3000 sq ft penthouse...'
        }
        // Add more project data as needed
    };
    
    const project = projectData[projectId] || {
        title: 'Project Details',
        description: 'Project information will be available soon.',
        images: [],
        details: 'More details coming soon...'
    };
    
    container.innerHTML = `
        <h2>${project.title}</h2>
        <p class="project-description">${project.description}</p>
        <div class="project-details">${project.details}</div>
    `;
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / speed;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + '+';
            }
        }, 10);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Staggered animations for cards
function addStaggeredAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Stagger project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, index * 100);
    });
    
    // Stagger service cards
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, index * 150);
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Focus management for dropdowns
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });
});

// Resize handler for responsive behavior
const debouncedResizeHandler = debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Reinitialize dropdowns based on screen size
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu && window.innerWidth <= 768) {
            // Reset desktop styles for mobile
            dropdownMenu.style.opacity = '';
            dropdownMenu.style.visibility = '';
            dropdownMenu.style.transform = '';
        }
    });
}, 250);

window.addEventListener('resize', debouncedResizeHandler);

// Loading overlay management
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
}

// Error handling for images (continued)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41IiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjEgMTVsLTUtNUwxMCAxNSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
        this.alt = 'Image not available';
        this.style.opacity = '0.5';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Tooltip functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: #333222;
        color: rgb(218, 207, 202);
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip above element, centered
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    let top = rect.top - tooltipRect.height - 10;
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
        top = rect.bottom + 10; // Show below if no room above
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
    
    e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltipElement) {
        e.target.tooltipElement.style.opacity = '0';
        setTimeout(() => {
            if (e.target.tooltipElement && e.target.tooltipElement.parentNode) {
                e.target.tooltipElement.parentNode.removeChild(e.target.tooltipElement);
                e.target.tooltipElement = null;
            }
        }, 300);
    }
}

// Enhanced project filtering
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Enhanced form validation with real-time feedback
function initializeFormValidation() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: block;
    `;
    
    field.style.borderColor = '#dc3545';
    field.parentNode.appendChild(errorElement);
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        'project-type': 'Project Type',
        budget: 'Budget',
        message: 'Message'
    };
    return labels[fieldName] || fieldName;
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track slow loading
            if (loadTime > 3000) {
                console.warn('Slow page load detected');
            }
        }
    });
    
    // Monitor scroll performance
    let scrollCount = 0;
    const scrollStart = performance.now();
    
    window.addEventListener('scroll', () => {
        scrollCount++;
        
        if (scrollCount === 100) {
            const scrollTime = performance.now() - scrollStart;
            console.log(`100 scroll events processed in ${scrollTime}ms`);
        }
    });
}

// Analytics integration (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Accessibility enhancements
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #333222;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Chloe Hayle Portfolio...');
    
    // Core functionality
    initializeMediaUpload();
    initializeFormValidation();
    initializeTooltips();
    initializeProjectFiltering();
    initializeAccessibility();
    
    // Performance monitoring
    initializePerformanceMonitoring();
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Initialize staggered animations
    setTimeout(() => {
        addStaggeredAnimations();
    }, 500);
    
    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    console.log('Portfolio initialization complete!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations, videos, etc.
        document.querySelectorAll('video').forEach(video => {
            if (!video.paused) {
                video.pause();
                video.dataset.wasPlaying = 'true';
            }
        });
    } else {
        // Page is visible - resume animations, videos, etc.
        document.querySelectorAll('video[data-was-playing="true"]').forEach(video => {
            video.play();
            video.removeAttribute('data-was-playing');
        });
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    showNotification('Connection restored', 'success', 3000);
});

window.addEventListener('offline', () => {
    showNotification('Connection lost. Some features may not work properly.', 'warning', 5000);
});

// Page load completion
window.addEventListener('load', () => {
    hideLoadingOverlay();
    
    // Announce page load completion for screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Page loaded successfully');
    }
    
    console.log('Chloe Hayle Portfolio loaded successfully!');
});

// Export functions for external use (if needed)
window.ChloePortfolio = {
    showNotification,
    trackEvent,
    showProjectModal
};
