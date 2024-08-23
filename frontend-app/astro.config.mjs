// Imports required
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@astrojs/tailwind';

// Astro config 
export default defineConfig({
    integrations: [react(), tailwindcss()],
});