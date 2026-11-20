/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardmuted: '#F1F5F9',
          navy: '#0F1E2E',
          deep: '#142B45',
          slate: '#334155',
          muted: '#64748B',
          border: '#E2E8F0',
          accent: '#0284C7',
          accenthover: '#0369A1',
          accentlight: '#E0F2FE',
          teal: '#0D9488',
          teallight: '#CCFBF1',
          amber: '#D97706',
          amberlight: '#FEF3C7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
};
