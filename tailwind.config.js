/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        custom: '0px 6px 16px rgba(0, 0, 0, 0.12)',
        primary: 'rgba(0, 0, 0, 0.12) 0px 6px 16px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px',
      },
      borderColor: {
        custom: '#ddd',
      },
    },
  },
  plugins: [],
};
