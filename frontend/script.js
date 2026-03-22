/**
 * ILMEC - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS - Method 3 Protected (Safe for GitHub)
    if (typeof emailjs !== 'undefined' && window.emailjsConfig) {
        emailjs.init(window.emailjsConfig.publicKey);
    } else {
        console.log('EmailJS: Add your config.js for contact form to work');
    }
    
    initMobileMenu();
    initVideoSlideshow();
    initScrollAnimations();
    initGalleryToggle();
    initEnquiryFormValidation();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

/**
 * Video Slideshow
 */
function initVideoSlideshow() {
    const videos = document.querySelectorAll('.hero-video');
    if (videos.length === 0) return;
    
    let currentIndex = 0;
    
    function playVideo(index) {
        videos.forEach((v, i) => {
            v.classList.toggle('active', i === index);
            if (i === index) v.play().catch(() => {});
        });
    }
    
    videos.forEach((video, index) => {
        video.play().catch(() => {});
        video.addEventListener('ended', () => {
            currentIndex = (currentIndex + 1) % videos.length;
            playVideo(currentIndex);
        });
    });
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % videos.length;
        playVideo(currentIndex);
    }, 6000);
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .stat-item, .gallery-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Gallery Toggle - View More/Less
 */
function initGalleryToggle() {
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    
    // Collapse items beyond first 6 initially
    galleryItems.forEach((item, index) => {
        if (index >= 6) {
            item.classList.add('collapsed');
        }
    });
}

function toggleGallery() {
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    const btn = document.getElementById('viewMoreBtn');
    
    // Check if any items beyond first 6 are visible (expanded state)
    const isExpanded = Array.from(galleryItems).slice(6).some(item => !item.classList.contains('collapsed'));
    
    if (isExpanded) {
        // Collapse to first 6
        galleryItems.forEach((item, index) => {
            if (index >= 6) {
                item.classList.add('collapsed');
            }
        });
        btn.innerHTML = `View More Images
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>`;
    } else {
        // Expand all
        galleryItems.forEach(item => {
            item.classList.remove('collapsed');
        });
        btn.innerHTML = `View Less Images
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>`;
    }
}

function toggleAwards() {
    const hiddenAward = document.querySelector('.hidden-award');
    const btn = document.getElementById('viewMoreAwardsBtn');
    const isHidden = hiddenAward.style.display === 'none' || hiddenAward.classList.contains('hidden-award');
    
    if (isHidden) {
        hiddenAward.style.display = 'flex';
        hiddenAward.classList.remove('hidden-award');
        btn.innerHTML = 'View Less Awards <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" /></svg>';
    } else {
        hiddenAward.style.display = 'none';
        hiddenAward.classList.add('hidden-award');
        btn.innerHTML = 'View More Awards <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>';
    }
}

/**
 * Enquiry Form Validation
 */
function initEnquiryFormValidation() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;

    // Get form fields
    const fields = {
        fullName: {
            element: document.getElementById('fullName'),
            errorElement: document.getElementById('fullNameError'),
            validate: function(value) {
                if (!value.trim()) {
                    return 'Full Name is required';
                }
                if (value.trim().length < 3) {
                    return 'Full Name must be at least 3 characters';
                }
                if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    return 'Full Name can only contain letters and spaces';
                }
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            errorElement: document.getElementById('emailError'),
            validate: function(value) {
                if (!value.trim()) {
                    return 'Email Address is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    return 'Please enter a valid email address';
                }
                return '';
            }
        },
        phone: {
            element: document.getElementById('phone'),
            errorElement: document.getElementById('phoneError'),
            validate: function(value) {
                if (!value.trim()) {
                    return 'Phone Number is required';
                }
                if (!/^\d+$/.test(value)) {
                    return 'Phone Number can only contain digits';
                }
                if (value.length !== 10) {
                    return 'Phone Number must be exactly 10 digits';
                }
                return '';
            }
        },
        courseInterest: {
            element: document.getElementById('courseInterest'),
            errorElement: document.getElementById('courseInterestError'),
            validate: function(value) {
                if (!value) {
                    return 'Please select a Course of Interest';
                }
                return '';
            }
        },
        message: {
            element: document.getElementById('message'),
            errorElement: document.getElementById('messageError'),
            validate: function(value) {
                if (!value.trim()) {
                    return 'Message is required';
                }
                if (value.trim().length < 10) {
                    return 'Message must be at least 10 characters';
                }
                return '';
            }
        }
    };

    // Function to validate a single field
    function validateField(fieldName) {
        const field = fields[fieldName];
        const errorMessage = field.validate(field.element.value);
        
        if (errorMessage) {
            field.element.classList.add('invalid');
            field.element.classList.remove('valid');
            field.errorElement.textContent = errorMessage;
            field.errorElement.style.display = 'block';
            return false;
        } else {
            field.element.classList.remove('invalid');
            field.element.classList.add('valid');
            field.errorElement.textContent = '';
            field.errorElement.style.display = 'none';
            return true;
        }
    }

    // Add input event listeners for real-time validation (remove error on typing)
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        
        field.element.addEventListener('input', function() {
            if (field.element.classList.contains('invalid')) {
                validateField(fieldName);
            }
        });
        
        field.element.addEventListener('blur', function() {
            validateField(fieldName);
        });
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Send via EmailJS (Method 3 - External Config)
        try {
    const config = window.emailjsConfig || {
                serviceID: 'YOUR_SERVICE_ID_HERE',
                templateID: 'YOUR_TEMPLATE_ID_HERE'
            };
            console.log('EmailJS send called with config:', config);
            if (config.serviceID === 'YOUR_SERVICE_ID_HERE') {
                console.warn('EmailJS: Configure your keys in config.js');
                return;
            }
            await emailjs.send(config.serviceID, config.templateID, {
                fullName: fields.fullName.element.value,
                email: fields.email.element.value,
                phone: fields.phone.element.value,
                courseInterest: fields.courseInterest.element.value,
                queryType: document.getElementById('queryType').value,
                message: fields.message.element.value
            });
            
            // Success
            const formContainer = document.querySelector('.enquiry-form');
            const successMessage = document.getElementById('successMessage');
            if (formContainer && successMessage) {
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                Object.keys(fields).forEach(fieldName => {
                    fields[fieldName].element.classList.remove('valid', 'invalid');
                });
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            alert('Failed to send enquiry. Please try again or contact us directly.');
        }
    });

    // Reset button handler
    const resetBtn = form.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                field.element.classList.remove('valid', 'invalid');
                field.errorElement.textContent = '';
                field.errorElement.style.display = 'none';
            });
        });
    }
}

// Function to reset form and show it again
function resetForm() {
    const form = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

