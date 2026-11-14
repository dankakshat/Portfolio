import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages hosts this project below /Portfolio/, not at the domain root.
  base: process.env.GITHUB_ACTIONS ? '/Portfolio/' : '/',
  plugins: [react()],
})
