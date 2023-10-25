import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#B5CC22",
        "main-dark": "#677518",
        gray: "#EBEBEB",
        "dark-gray": "#F6F6F6",
        "border-gray": "#AEAEAE",
      },
      fontFamily: { noto: ["Noto Sans TC", "sans-serif"] },
      height: { "nav-mobile": "72px", "nav-desktop": "104px" },
      spacing: { "nav-mobile": "72px", "nav-desktop": "104px" },
    },
  },
  plugins: [],
};
export default config;
