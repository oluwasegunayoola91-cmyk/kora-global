/**
 * Environment configuration helper for KORA Global.
 * Automatically resolves API keys and configuration across Netlify, Vite, and Node environments.
 */

export const getApiKey = (): string => {
  // 1. Vite environment variables (VITE_API_KEY, VITE_GEMINI_API_KEY)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_API_KEY) return import.meta.env.VITE_API_KEY;
    if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
  }

  // 2. Netlify environment variables injected via define (process.env.API_KEY)
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.API_KEY) return process.env.API_KEY;
    if (process.env.VITE_API_KEY) return process.env.VITE_API_KEY;
    if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
    if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  }

  return '';
};

export const API_KEY = getApiKey();
