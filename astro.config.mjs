// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: '/orderlyze',
  server: {
    host: true,
    port: 4322,
  },
  vite: {
    server: {
      allowedHosts: ['aiconnector-orderlyze.germanywestcentral.cloudapp.azure.com'],
    },
  },
});
