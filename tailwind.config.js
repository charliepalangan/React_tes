/** @type {import('tailwindcss').Config} */



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#CC5803",
          "secondary": "#D98E04",
          "accent": "#0078fa",
          "neutral": "#f3f4f6",
          "base-100": "#ffffff",
          "info": "#59adff",
          "success": "#009a07",
          "warning": "#F7B05B",
          "error": "#c7054a",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
}