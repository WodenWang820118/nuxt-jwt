import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 4200,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: '../tsconfig.app.json', // Nuxt copies this string as-is to the `./.nuxt/tsconfig.json`, therefore it needs to be relative to that directory
    },
  },
  imports: {
    autoImport: true,
  },
  css: [],
  vite: {
    plugins: [nxViteTsPaths()],
  },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  routeRules: {
    '/login': { prerender: true },
  },
  ssr: false,
  sourcemap: {
    server: true,
    client: true,
  },
  features: {
    devLogs: true, // or 'silent' to handle logs yourself
  },
});
