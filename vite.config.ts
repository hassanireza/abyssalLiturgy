import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base is set to the repo name for GitHub Pages project sites.
// Change '/brew-guide/' to '/<your-repo-name>/' if you rename the repo,
// or to '/' if deploying to a user/organization root site (e.g. username.github.io).
export default defineConfig({
  base: '/brew-guide/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
});
