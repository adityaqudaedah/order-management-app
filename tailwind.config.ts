import type { Config } from "tailwindcss";

const config: Config = {
  darkMode : "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "custom-base-container": "#f1f4f6",
        "custom-primary": "#1ba8df",
        "custom-secondary": "#052a49",
        "custom-default": "#fffff",
      },
      width: {
        "custom-input": "533px",
        "custom-search-input": "320px"
      },
      height: {
        "custom-height-card-container" : "813px"
      },
      colors: {
        "custom-text-order-detail" : "#002D40"
      }
      // height: {
      //   "custom-813" : "813px"
      // }
    },
  },
  plugins: [],
};
export default config;
