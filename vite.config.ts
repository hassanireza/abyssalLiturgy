import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base is set to the repo name for GitHub Pages project sites.
// This must match your GitHub repo name exactly (case-sensitive), e.g.
// for https://username.github.io/abyssalLiturgy/ the base is '/abyssalLiturgy/'.
// If you rename the repo, update this to match, or use '/' if deploying to
// a root user/organization site (username.github.io).
export default defineConfig({
  base: '/abyssalLiturgy/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
});
