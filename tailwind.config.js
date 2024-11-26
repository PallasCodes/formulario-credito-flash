/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './formkit.theme.ts',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Comfortaa', 'system-ui'],
    },
  },
  plugins: [],
  darkMode: 'false',
}
