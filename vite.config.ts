import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Retrieve API key from Netlify environment variables or local env
  const apiKey =
    process.env.API_KEY ||
    env.API_KEY ||
    process.env.VITE_API_KEY ||
    env.VITE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    env.GEMINI_API_KEY ||
    process.env.RESEND_API_KEY ||
    env.RESEND_API_KEY ||
    '';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.VITE_API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(
        process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || apiKey
      ),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
