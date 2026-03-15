import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        zen: {
          lavender:   { DEFAULT: "#E8E0F0", light: "#F3EEF8", dark: "#C9B8DC" },
          mint:       { DEFAULT: "#D4F0E8", light: "#E8F8F2", dark: "#A8DCC8" },
          peach:      { DEFAULT: "#FFE4D6", light: "#FFF0E8", dark: "#FFCBB0" },
          sky:        { DEFAULT: "#D6EEFF", light: "#E8F4FF", dark: "#A8D4F0" },
          pink:       { DEFAULT: "#FF6B9D", light: "#FF8DB5", dark: "#E84D7F" },
          orange:     { DEFAULT: "#FFA63E", light: "#FFB96A", dark: "#E88A1E" },
          green:      { DEFAULT: "#5CD85C", light: "#7CE47C", dark: "#3CB83C" },
          blue:       { DEFAULT: "#4DABF7", light: "#74BFF9", dark: "#2B8FD9" },
          purple:     { DEFAULT: "#9775FA", light: "#B197FC", dark: "#7950D8" },
        },
        monster: {
          soft_purple: "#B39DDB",
          soft_blue:   "#81D4FA",
          soft_pink:   "#F48FB1",
          soft_green:  "#A5D6A7",
          soft_orange: "#FFCC80",
        },
        currency: {
          gold:   "#FFD700",
          gem:    "#9C27B0",
          exp:    "#00BCD4",
        },
        correct:  "#5CD85C",
        wrong:    "#FF6B6B",
        bg: {
          DEFAULT: "#FFF8F0",
          card:    "#FFFFFF",
          dark:    "#2D2D3D",
        },
        text: {
          primary:   "#2D2D3D",
          secondary: "#6B7280",
          inverse:   "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ['"Jua"', "sans-serif"],
        body:    ['"Nunito"', '"Noto Sans KR"', "sans-serif"],
        game:    ['"Fredoka"', '"Jua"', "sans-serif"],
      },
      borderRadius: {
        "bubble": "9999px",
        "card":   "1.25rem",
        "btn":    "1rem",
        "fab":    "1.75rem",
      },
      boxShadow: {
        "soft":     "0 4px 20px rgba(0, 0, 0, 0.06)",
        "card":     "0 8px 30px rgba(0, 0, 0, 0.08)",
        "pop":      "0 6px 0 rgba(0, 0, 0, 0.12)",
        "glow-pink":    "0 0 20px rgba(255, 107, 157, 0.4)",
        "glow-green":   "0 0 20px rgba(92, 216, 92, 0.4)",
        "glow-gold":    "0 0 20px rgba(255, 215, 0, 0.5)",
        "monster":      "0 10px 40px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        "pop-in": {
          "0%":   { transform: "scale(0)", opacity: "0" },
          "70%":  { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "shake": {
          "0%, 100%":            { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%":  { transform: "translateX(-6px)" },
          "20%, 40%, 60%, 80%":  { transform: "translateX(6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)" },
          "50%":      { boxShadow: "0 0 30px rgba(255, 215, 0, 0.7)" },
        },
        "hit-flash": {
          "0%":   { filter: "brightness(1)" },
          "50%":  { filter: "brightness(2) saturate(0)" },
          "100%": { filter: "brightness(1)" },
        },
        "treasure-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%":      { transform: "translateY(-20px) rotate(-5deg)" },
          "75%":      { transform: "translateY(-20px) rotate(5deg)" },
        },
      },
      animation: {
        "pop-in":           "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float":            "float 3s ease-in-out infinite",
        "shake":            "shake 0.5s ease-in-out",
        "glow-pulse":       "glow-pulse 2s ease-in-out infinite",
        "hit-flash":        "hit-flash 0.3s ease-out",
        "treasure-bounce":  "treasure-bounce 1s ease-in-out infinite",
      },
      screens: {
        "mobile":  "375px",
        "tablet":  "768px",
        "desktop": "1024px",
      },
    },
  },
  plugins: [],
};

export default config;
