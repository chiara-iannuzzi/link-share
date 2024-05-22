import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      'electric-violet': {
        '50': '#f2f2ff',
        '100': '#e8e7ff',
        '200': '#d4d2ff',
        '300': '#b3aeff',
        '400': '#8d81ff',
        '500': '#684dff',
        '600': '#633bfe',
        '700': '#4617ea',
        '800': '#3b13c4',
        '900': '#3312a0',
        '950': '#1b086d',
    },
    },
    extend: {
      maxHeight: {
        'screen': 'calc(100vh - 200px)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
