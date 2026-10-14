// ---------- Mobile menu & dropdown ----------
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const dropdown = document.querySelector('.dropdown');
dropdown.querySelector('.dropdown-btn').addEventListener('click', e => {
  e.stopPropagation();
  dropdown.classList.toggle('open');
});
document.addEventListener('click', () => dropdown.classList.remove('open'));

// ---------- Testimonials carousel ----------
const track = document.getElementById('carouselTrack');
const slides = track.children;
const dotsWrap = document.getElementById('dots');
let index = 0, timer;

for (let i = 0; i < slides.length; i++) {
  const d = document.createElement('button');
  d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
  d.addEventListener('click', () => { goTo(i); restart(); });
  dotsWrap.appendChild(d);
}
function goTo(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  [...dotsWrap.children].forEach((d, n) => d.classList.toggle('active', n === index));
}
function restart() { clearInterval(timer); timer = setInterval(() => goTo(index + 1), 5000); }
document.getElementById('nextBtn').addEventListener('click', () => { goTo(index + 1); restart(); });
document.getElementById('prevBtn').addEventListener('click', () => { goTo(index - 1); restart(); });
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', restart);
goTo(0); restart();

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const fields = {
  phone: { el: document.getElementById('phone'), err: document.getElementById('phoneErr'),
    check: v => !v ? 'Phone number is required.' : !/^\d{10}$/.test(v.replace(/[\s\-()]/g, '')) ? 'Enter a valid 10-digit phone number.' : '' },
  email: { el: document.getElementById('email'), err: document.getElementById('emailErr'),
    check: v => !v ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Enter a valid email address.' : '' },
  message: { el: document.getElementById('message'), err: document.getElementById('messageErr'),
    check: v => !v ? 'Please write a message.' : v.length < 10 ? 'Message must be at least 10 characters.' : '' }
};
function validate(f) {
  const msg = f.check(f.el.value.trim());
  f.err.textContent = msg;
  f.el.classList.toggle('invalid', !!msg);
  return !msg;
}
Object.values(fields).forEach(f => f.el.addEventListener('input', () => validate(f)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = Object.values(fields).map(validate).every(Boolean);
  const success = document.getElementById('formSuccess');
  if (ok) {
    form.reset();
    success.hidden = false;
    setTimeout(() => success.hidden = true, 6000);
  } else {
    success.hidden = true;
  }
});

// ---------- Newsletter ----------
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('newsEmail');
  const msg = document.getElementById('newsMsg');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
  msg.style.color = valid ? '#1b7a3a' : '#c62828';
  msg.textContent = valid ? 'Thanks for subscribing!' : 'Please enter a valid email address.';
  if (valid) input.value = '';
});