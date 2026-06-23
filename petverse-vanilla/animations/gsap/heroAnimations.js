// Simple GSAP animations for the Hero Section
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  // Fade in the navbar
  tl.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  // Fade in the title
  tl.from(".hero-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.4");

  // Fade in the subtitle
  tl.from(".hero-subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6");

  // Fade in the buttons
  tl.from(".hero-cta .btn-primary, .hero-cta .btn-outline", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "back.out(1.7)"
  }, "-=0.4");

  // Magnetic button effect (simplified)
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
});
