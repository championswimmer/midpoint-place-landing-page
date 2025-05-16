document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('body-with-menu-open');
    });
  }

  // Close mobile menu when clicking on links
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('body-with-menu-open');
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll animation for sections
  const fadeElements = document.querySelectorAll('.feature-card, .step, .faq-item');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeInObserver.observe(element);
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Open the clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Call to action button animations
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Initialize the demo animation
  initDemoAnimation();

  // Initialize the flipping text
  initFlippingText();
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add class to feature cards on hover
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.classList.add('hovered');
  });
  
  card.addEventListener('mouseleave', function() {
    this.classList.remove('hovered');
  });
});

function initFlippingText() {
  const flippingTextElement = document.querySelector('.flipping-text');
  if (!flippingTextElement) return;

  const texts = JSON.parse(flippingTextElement.getAttribute('data-texts'));
  const colors = [
    'var(--color-primary)',
    'var(--color-primary-light)',
    'var(--color-primary-dark)',
    'var(--color-accent)',
    'var(--color-accent-light)',
    'var(--color-accent-dark)',
    'var(--color-success)'
  ];

  let currentIndex = 0;

  setInterval(() => {
    flippingTextElement.classList.add('fade-out');
    setTimeout(() => {
      flippingTextElement.textContent = texts[currentIndex];
      flippingTextElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      flippingTextElement.classList.remove('fade-out');
      flippingTextElement.classList.add('fade-in');
      setTimeout(() => {
        flippingTextElement.classList.remove('fade-in');
      }, 200);
      currentIndex = (currentIndex + 1) % texts.length;
    }, 200);
  }, 1000);
}
