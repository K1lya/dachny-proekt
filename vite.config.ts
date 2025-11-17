import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json',
        buildMode: true,
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}" --config eslint.config.js',
        useFlatConfig: true,
      },
    }),
  ],
});
