/* Edit this object to personalize the site. Leave a URL as '#' to hide its destination. */
const portfolio = {
  name: 'Your Name',
  handle: '@yourhandle',
  skills: ['Creative direction', 'UI / UX design', 'Front-end development', 'Brand systems', 'Motion design', 'Worldbuilding'],
  projects: [
    { title: 'Nocturne', description: 'A cinematic identity and responsive digital home for a story-led creative project.', tags: ['Branding', 'Web design'], url: '#' },
    { title: 'Glass Garden', description: 'An atmospheric product experience built to make a complex tool feel intimate and clear.', tags: ['Product', 'Interface'], url: '#' },
    { title: 'Afterimage', description: 'A visual system and launch space for work that lives between digital craft and art direction.', tags: ['Art direction', 'Code'], url: '#' }
  ],
  social: [
    { label: 'Email', url: 'mailto:hello@example.com' },
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Instagram', url: '#' }
  ]
};

document.title = `${portfolio.name} — Portfolio`;
document.querySelector('h1').textContent = portfolio.name;
document.querySelector('.handle').textContent = portfolio.handle;
document.querySelector('.avatar-initials').textContent = portfolio.name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
document.querySelector('footer span').innerHTML = `© <span id="year"></span> ${portfolio.name}`;
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#skill-list').innerHTML = portfolio.skills.map(skill => `<span class="skill">${skill}</span>`).join('');
document.querySelector('#project-list').innerHTML = portfolio.projects.map((project, index) => `
  <article class="project">
    <span class="project-number">ARCHIVE / 0${index + 1}</span>
    <h3>${project.title}</h3><p>${project.description}</p>
    <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    <a href="${project.url}" ${project.url !== '#' ? 'target="_blank" rel="noreferrer"' : ''}>View project →</a>
  </article>`).join('');
document.querySelector('#social-links').innerHTML = portfolio.social.map(link => `<a href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${link.label} ↗</a>`).join('');

const audio = document.querySelector('#ambient-audio');
const toggle = document.querySelector('.sound-toggle');
const label = document.querySelector('.sound-label');
let audioRequested = false;
async function toggleAudio() {
  if (audio.paused) {
    try { await audio.play(); audioRequested = true; toggle.setAttribute('aria-pressed', 'true'); toggle.setAttribute('aria-label', 'Mute ambient music'); label.textContent = 'Sound on'; }
    catch (_) { label.textContent = 'Add ambient.mp3'; }
  } else { audio.pause(); toggle.setAttribute('aria-pressed', 'false'); toggle.setAttribute('aria-label', 'Play ambient music'); label.textContent = 'Sound off'; }
}
toggle.addEventListener('click', toggleAudio);
document.addEventListener('pointerdown', event => {
  if (!audioRequested && !event.target.closest('.sound-toggle')) toggleAudio();
}, { once: true });

const canvas = document.querySelector('#snow');
const ctx = canvas.getContext('2d');
let flakes = [];
function resizeSnow() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); flakes = Array.from({ length: Math.min(135, Math.floor(innerWidth / 9)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.9 + .45, speed: Math.random() * .55 + .2, drift: Math.random() * .6 - .3 })); }
function snow() { ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.fillStyle = 'rgba(255,250,255,.78)'; flakes.forEach(flake => { flake.y += flake.speed; flake.x += flake.drift + Math.sin(flake.y * .008) * .15; if (flake.y > innerHeight + 4) { flake.y = -4; flake.x = Math.random() * innerWidth; } if (flake.x > innerWidth + 4) flake.x = -4; if (flake.x < -4) flake.x = innerWidth + 4; ctx.beginPath(); ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2); ctx.fill(); }); requestAnimationFrame(snow); }
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { resizeSnow(); addEventListener('resize', resizeSnow); snow(); }

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
