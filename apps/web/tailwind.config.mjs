/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'nav-desktop': '1300px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#1A0B3C',
          hover: '#2A125E',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#8A7CA8',
          hover: '#736491',
          foreground: '#FFFFFF',
        },
        tertiary: {
          DEFAULT: '#FF3DA5',
          hover: '#E02A8C',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#FF3DA5',
          hover: '#E02A8C',
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A0B3C',
        },
        muted: {
          DEFAULT: '#8A7CA8',
          foreground: '#1A0B3C',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A0B3C',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A0B3C',
        },
        brand: {
          primary: '#1A0B3C',
          secondary: '#8A7CA8',
          tertiary: '#FF3DA5',
          accent: '#FF3DA5',
          background: '#FFF0F6',
          surface: '#FFFFFF',
          border: '#F2D8E6',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        heading: ['Fraunces', 'serif'],
        h1: ['Fraunces', 'serif'],
        sans: ['Nunito', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        label: ['Nunito', 'sans-serif'],
        mono: ['Nunito', 'monospace'],
        outfit: ['Fraunces', 'serif'],
        sora: ['Nunito', 'sans-serif'],
        space: ['Nunito', 'sans-serif'],
        cursive: ['Fraunces', 'serif'],
        serifAccent: ['Fraunces', 'serif'],
      },
      fontSize: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        h1: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.6' }],
        label: ['0.72rem', { letterSpacing: '0.04em' }],
      },
      borderRadius: {
        sm: '10px',
        sleek: '10px',
        md: '18px',
        modern: '18px',
        button: '18px',
        lg: '28px',
        card: '28px',
        '3xl': '28px',
        pill: '9999px',
      },
      spacing: {
        2: '8px',
        4: '16px',
        8: '32px',
        card: '24px',
        buttonX: '20px',
        buttonY: '12px',
      },
    },
  },
  plugins: [],
}
