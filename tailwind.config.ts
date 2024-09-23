import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#082F68',
        error: '#E53E3E',
        success: '#2B6CB0',
        info: '#3182CE',
      },
      fontFamily: {
        dotgothic: ['"DotGothic16"', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
    },
    screens: {
      xs: '425px', // 425px以上の画面幅で適用
      sm: '640px', // 640px以上の画面幅で適用
      md: '768px', // 768px以上の画面幅で適用
      lg: '1024px', // 1024px以上の画面幅で適用
    },
  },
  plugins: [],
};

export default config;
