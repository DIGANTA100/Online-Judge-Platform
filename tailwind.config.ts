import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090d",
          900: "#0b0f14",
          850: "#10151d",
          800: "#151b24",
          700: "#222b37"
        },
        mint: {
          300: "#76f7d1",
          400: "#35dfb5",
          500: "#12b892"
        },
        amberline: {
          300: "#ffd36f",
          400: "#ffb84d",
          500: "#f59f2a"
        },
        coral: {
          300: "#ff9f9f",
          400: "#ff7676"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(53, 223, 181, 0.16)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)",
        "premium-line": "linear-gradient(135deg, #76f7d1 0%, #ffb84d 52%, #ff7676 100%)"
      }
    }
  },
  plugins: []
};

export default config;
