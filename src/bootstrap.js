// GitHub Pages can be configured to serve a repository branch directly.
// Keep an elegant static archive visible in that case; Vite's production build
// rewrites this module into /assets/ and loads the complete React/R3F experience.
const isRawSource = import.meta.url.includes('/src/bootstrap.js')
const isDirectFile = window.location.protocol === 'file:'

if (!isRawSource || (!window.location.hostname.endsWith('github.io') && !isDirectFile)) {
  import('./main.tsx')
} else {
  const root = document.querySelector('.archive-fallback')
  const copy = document.querySelector('.fallback-copy')
  const title = copy?.querySelector('h1')
  const eyebrow = copy?.querySelector('p')
  const note = copy?.querySelector('small')
  const angel = document.querySelector('.fallback-angel')
  const notes = { Identity: 'A sanctuary for philosophy, background, and ambition.', Projects: 'The archive opens into selected works and technical explorations.', Skills: 'A constellation of tools, practices, and ongoing study.', Experience: 'Chronicles of academic milestones and creative work.', Laboratory: 'Unfinished experiments, systems, and strange prototypes.', Contact: 'The final transmission awaits beyond the celestial gate.' }
  document.querySelectorAll('[data-location]').forEach((button, index) => button.addEventListener('click', () => {
    const location = button.dataset.location
    document.querySelectorAll('[data-location]').forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    if (eyebrow) eyebrow.textContent = `0${index + 2} / ${location?.toUpperCase()}`
    if (title) title.innerHTML = `${location?.toUpperCase()}<br><i>ARCHIVE</i>`
    if (note) note.textContent = notes[location] || ''
    if (angel) angel.style.transform = `translateX(-50%) scale(${1 + index * .025}) rotate(${(index - 2) * 1.2}deg)`
  }))
  const profiles = ['balanced', 'cinematic', 'lite']
  let profile = 0
  document.querySelector('.fallback-quality')?.addEventListener('click', (event) => {
    profile = (profile + 1) % profiles.length
    root?.classList.remove(...profiles)
    root?.classList.add(profiles[profile])
    event.currentTarget.textContent = profiles[profile]
  })
}
