import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dst-real-estate-exchange.onrender.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
