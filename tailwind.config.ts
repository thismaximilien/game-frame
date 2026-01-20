import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./game/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: [
        "SF Pro Rounded",
        "-apple-system",
        "BlinkMacSystemFont",
        "\"Segoe UI\"",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};

export default config;
