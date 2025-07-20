document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
    }, 800);
  });

  // Typing effect for title
  const title = document.querySelector('.title-typewriter');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40);
      } else {
        title.style.borderRight = 'none';
      }
    }
    gsap.to(title, { opacity: 1, duration: 0.4, onComplete: () => setTimeout(type, 150) });
  }

  // GSAP Scroll Animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.section-container').forEach((section, index) => {
    gsap.fromTo(section, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          delay: index * 0.15
        }
      }
    );
    gsap.from(section.querySelectorAll('li, img'), {
      opacity: 0,
      y: 15,
      scale: 0.98,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      }
    });
  });

  // Parallax Effect for Images
  gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
      y: () => window.innerHeight * 0.12,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.2
      }
    });
  });

  // Logo Animation
  gsap.from('.logo', {
    opacity: 0,
    scale: 0.5,
    rotation: 360,
    duration: 1.5,
    ease: 'back.out(1.7)'
  });

  // Throttle function for performance
  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Particle Effect
  const particleContainer = document.getElementById('particles');
  const colors = ['#ff79c6', '#79ff97', '#8be9fd'];
  const createParticle = throttle(() => {
    if (particleContainer.children.length < 50) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.width = Math.random() * 8 + 3 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDuration = Math.random() * 4 + 2 + 's';
      particleContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 6000);
    }
  }, 150);
  setInterval(createParticle, 150);

  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const moveCursor = throttle((e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }, 12);
  document.addEventListener('mousemove', moveCursor);
  document.querySelectorAll('.hover-effect').forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
});
