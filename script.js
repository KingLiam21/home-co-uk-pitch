// Count-up animation for stats
function animateCount(element, target, suffix = '') {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/(\d+(?:\.\d+)?)(k?\+?)/i);
        if (match) {
          const num = parseFloat(match[1]);
          const suffix = match[2];
          animateCount(stat, num, suffix);
        }
      });
    }
  });
}, observerOptions);

// Tilt effect for cards
function addTiltEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Observe stats banner
  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) {
    statsObserver.observe(statsBanner);
  }
  
  // Add tilt effect to all cards
  const cards = document.querySelectorAll('.problem-card, .feature-card, .metric-card, .team-card');
  cards.forEach(card => addTiltEffect(card));

  // Accordion: allow one open at a time
  const accordions = document.querySelectorAll('.accordion details');
  accordions.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        accordions.forEach(other => { if (other !== d) other.open = false; });
      }
    });
  });
});
