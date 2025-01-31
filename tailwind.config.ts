import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors")

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage: {
      "background-pattern": "var(--background-pattern)",
    },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      option: "var(--option)",
      subtitle: "var(--subtitle)",
      "blue": "#abc1e1",
      "green": "#26d782",
      "grey": "#f4f6fa",
      "navy": {
        grey: "#626c7f",
        DEFAULT: "#3b4d66",
        dark: "#313e51",
      },
      "purple": "#a729f5",
      "red": "#ee5454",
      "white": colors.white,
      "transparent": colors.transparent,
    },
    fontSize: {
      "xs": ["0.85rem", {
        lineHeight: "1.5",
      }],
      "sm": ["0.875", {
        lineHeight: "1.5",
      }],
      "base": ["1rem", {
        lineHeight: "1.5",
      }],
      "md": ["1.125rem", {
        lineHeight: "1",
      }],
      "lg": ["1.25rem", {
        lineHeight: "1.2",
      }],
      "xl": ["1.5rem", {
        lineHeight: "1.2",
      }],
      "2xl": ["2.5rem", {
        lineHeight: "1",
      }],
      "3xl": ["4rem", {
        lineHeight: "1",
      }],
      "4xl": ["9rem", {
        lineHeight: "1",
      }],
    },
  },
  plugins: [],
} satisfies Config;
