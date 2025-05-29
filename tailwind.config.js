/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Gradient classes for artist colors
    'from-red-500',
    'to-pink-600',
    'from-gray-900',
    'to-red-900',
    'from-yellow-600',
    'to-yellow-800',
    'from-indigo-600',
    'to-purple-600',
    // Text and border colors
    'text-red-600',
    'text-red-700',
    'text-blue-500',
    'text-yellow-600',
    'text-indigo-600',
    'border-red-600',
    'border-red-700',
    'border-blue-500',
    'border-yellow-600',
    'border-indigo-600'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        'paper-color': 'var(--paper-color)',
        'paper-shadow': 'var(--paper-shadow)',
        // Brand Colors for Setlist Sequence
        brand: {
          primary: '#0029FF',      // Blue - Interactive elements, buttons, links
          secondary: '#F9E793',    // Yellow - Background accents, highlights
          tertiary: '#7F4A16',     // Brown - Text, borders, grounding elements
        },
      },
    },
  },
  plugins: [],
}

