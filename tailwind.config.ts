import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#4A5D3E",
          dark: "#3A4B30",
          light: "#5C7350",
          50: "#f4f7f2",
          100: "#e6ede2",
          200: "#cedcc6",
          300: "#adc2a1",
          400: "#85a176",
          500: "#4A5D3E",
          600: "#3A4B30",
          700: "#2e3c26",
          800: "#263020",
          900: "#1f281a",
        },
        cream: "#F9F9FB",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover":
          "0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
