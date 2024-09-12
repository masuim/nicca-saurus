import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    screens: {
      sm: '640px', //640px以上の画面幅で適用
      md: '768px', //768px以上の画面幅で適用
      lg: '1024px', //1024px以上の画面幅で適用
    },
  },
  plugins: [],
};

export default config;
