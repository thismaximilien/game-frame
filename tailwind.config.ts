import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./screens/**/*.{js,ts,jsx,tsx,mdx}", "./game/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    // Stat card colors
    { pattern: /^(bg|border|text)-(yellow|green|cyan|orange|red|blue|purple|pink)-(400|500|600)$/ },
  ],
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
