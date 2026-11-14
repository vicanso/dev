import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vicanso.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['avatars.githubusercontent.com'],
  },
});
