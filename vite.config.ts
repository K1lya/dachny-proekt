import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/dachny-proekt/',
  plugins: [
    react(),
    svgr({ include: '**/*.svg?react' }),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json',
        buildMode: true,
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}" --config eslint.config.mjs',
        useFlatConfig: true,
      },
    }),
  ],
});
