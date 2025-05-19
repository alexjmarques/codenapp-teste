/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Garante que o Tailwind seja aplicado nos arquivos do src
    ],
    theme: {
      extend: {
        colors: {
          primaryDark: '#2b4e3e',
          primaryLight: '#4e7c6f',
        },
      },
    },
    plugins: [],
  };
