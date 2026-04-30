import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', ...fontFamily.sans],
      },
      colors: {
        border: '#ebebeb',
        muted: '#888',
        accent: '#0a0a0a',
      },
    },
  },
  plugins: [],
};

export default config;
