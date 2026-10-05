const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0;
let timer;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active-slide', i === current));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

function restartSlider() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 6000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    restartSlider();
  });
});

restartSlider();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

const form = document.getElementById('complaintForm');
const message = document.getElementById('formMessage');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Submitting complaint...';
  const data = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch('http://localhost:4000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Submission failed');

    message.textContent = `Complaint submitted successfully. Reference: ${result.reference}`;
    form.reset();
  } catch (error) {
    const saved = JSON.parse(localStorage.getItem('saafSuthraComplaints') || '[]');
    const localReference = `LOCAL-${Date.now()}`;
    saved.push({ ...data, reference: localReference, createdAt: new Date().toISOString() });
    localStorage.setItem('saafSuthraComplaints', JSON.stringify(saved));
    message.textContent = `Demo mode: complaint saved in this browser. Reference: ${localReference}`;
    form.reset();
  }
});
