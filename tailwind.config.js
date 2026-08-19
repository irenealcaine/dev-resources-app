import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#0B0A08",
            foreground: "#E8E5DF",
            primary: {
              DEFAULT: "#D4FF3F",
              foreground: "#14130F",
            },
            secondary: {
              DEFAULT: "#FF6B35",
              foreground: "#14130F",
            },
            default: {
              DEFAULT: "#1D1B17",
              foreground: "#E8E5DF",
            },
            content1: "#15130F",
            content2: "#1D1B17",
            content3: "#26231D",
            content4: "#2E2A23",
            focus: "#D4FF3F",
            divider: "#2A2721",
          },
        },
      },
    }),
  ],
};