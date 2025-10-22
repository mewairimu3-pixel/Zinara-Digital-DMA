// Testimonials carousel
let currentSlide = 0;
const slides = document.querySelectorAll('#testimonial-carousel > div');
const totalSlides = slides.length;

function showSlide(index) {
    const carousel = document.getElementById('testimonial-carousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators(index);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function updateIndicators(activeIndex) {
    const indicators = document.querySelectorAll('#testimonials .flex.justify-center button');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('bg-orange');
            indicator.classList.remove('bg-gray-300');
        } else {
            indicator.classList.add('bg-gray-300');
            indicator.classList.remove('bg-orange');
        }
    });
}

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// FAQ accordion toggle
function toggleFAQ(index) {
    const content = document.getElementById('faq-' + index);
    const icon = document.getElementById('faq-icon-' + index);
    content.classList.toggle('hidden');
    icon.innerHTML = content.classList.contains('hidden') ? '▼' : '▲';
}

// Pricing content toggle
function togglePricingContent(planNumber) {
    const content = document.querySelector('.pricing-content-' + planNumber);
    const button = document.querySelector('.pricing-toggle-' + planNumber);

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.textContent = '- Read Less';
    } else {
        content.style.display = 'none';
        button.textContent = '+ Read More';
    }
}

// JavaScript for Animations - Enterprise Style
// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animate, 1);
            } else {
                counter.innerText = target;
            }
        };
        animate();
    });
}

 {/* Intersection Observer for Scroll Animations */}
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('animate-fade-in-up') && entry.target.querySelector('.counter')) {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Observe hero section animations
    document.querySelectorAll('.animate-fade-in-up, .animate-slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScroll();

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
        card.classList.add('animate-on-scroll');
    });
});

// Performance optimization - lazy load animations
let animationTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(function() {
        // Trigger animations for elements in viewport
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animate)');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('animate');
            }
        });
    }, 16); // ~60fps
});

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('contactForm').classList.remove('hidden');
        document.getElementById('successMessage').classList.add('hidden');
        event.target.reset();
    }, 3000);
}