// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE NAV =====
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FADE-IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== PARALLAX EFFECT =====
const parallaxBgs = document.querySelectorAll('.parallax-bg');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  parallaxBgs.forEach(bg => {
    const section = bg.closest('.cinematic-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      const speed = 0.3;
      const offset = (rect.top * speed);
      bg.style.transform = `translateY(${offset}px)`;

      // Zoom effect
      const progress = 1 - (rect.top / window.innerHeight);
      const scale = 1 + Math.max(0, progress * 0.1);
      bg.querySelector('img').style.transform = `scale(${scale})`;
    }
  });
});

// ===== CART FUNCTIONALITY =====
const cartCount = document.querySelector('.cart-count');
const cartNotification = document.getElementById('cartNotification');
let itemCount = 0;

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    itemCount++;
    cartCount.textContent = itemCount;

    // Animation on cart icon
    cartCount.style.transform = 'scale(1.4)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);

    // Show notification
    cartNotification.classList.add('show');
    setTimeout(() => cartNotification.classList.remove('show'), 2500);

    // Button feedback
    const originalText = btn.textContent;
    btn.textContent = 'تمت الإضافة ✓';
    btn.style.background = 'var(--olive)';
    btn.style.borderColor = 'var(--olive)';
    btn.style.color = 'var(--white)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 1500);
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== STAGGER ANIMATION DELAY FOR GRID ITEMS =====
document.querySelectorAll('.products-grid .product-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.15}s`;
});
