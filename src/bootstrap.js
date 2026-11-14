// GitHub Pages can be configured to serve a repository branch directly.
// Keep an elegant static archive visible in that case; Vite's production build
// rewrites this module into /assets/ and loads the complete React/R3F experience.
const isRawSource = import.meta.url.includes('/src/bootstrap.js')
const isDirectFile = window.location.protocol === 'file:'

if (!isRawSource || (!window.location.hostname.endsWith('github.io') && !isDirectFile)) {
  import('./main.tsx')
}
