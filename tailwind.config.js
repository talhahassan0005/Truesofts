/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FAFAFA',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif',],
        'inter': ['Inter', 'sans-serif',],
        'manrope': ['Manrope', 'sans-serif',],
        'poppins': ['Poppins', 'sans-serif',],
      }
    },
  },
  plugins: ['tailwind-scrollbar-hide']
}
