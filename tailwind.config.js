/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#075293',
          'blue-hover': '#053f72',
          'blue-light': '#0a64b3',
          green: '#8EC641',
          'green-hover': '#7db037',
          'green-light': '#a2d659',
          navy: '#062F55',
          'navy-deep': '#031B33',
          'navy-darker': '#021224',
          charcoal: '#111827',
          'soft-blue': '#EAF3F9',
          'soft-green': '#F1F8E7',
          muted: '#64748b',
          'border-light': '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'premium': '0 10px 30px -5px rgba(7, 82, 147, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'premium-hover': '0 20px 40px -10px rgba(7, 82, 147, 0.16), 0 8px 10px -4px rgba(0, 0, 0, 0.06)',
        'glow-blue': '0 0 30px rgba(7, 82, 147, 0.35)',
        'glow-green': '0 0 30px rgba(142, 198, 65, 0.35)',
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
}
