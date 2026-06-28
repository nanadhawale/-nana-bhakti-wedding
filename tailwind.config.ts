import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#ff8371",
        "inverse-surface": "#34302c",
        "primary-container": "#800000",
        "secondary-fixed": "#ffe088",
        "surface": "#fff8f5",
        "surface-variant": "#e9e1dc",
        "surface-container-low": "#fbf2ed",
        "error": "#ba1a1a",
        "primary-fixed": "#ffdad4",
        "outline-variant": "#e2bfb9",
        "on-surface": "#1e1b18",
        "inverse-on-surface": "#f8efea",
        "surface-bright": "#fff8f5",
        "tertiary": "#2a261d",
        "primary": "#570000",
        "primary-fixed-dim": "#ffb4a8",
        "on-primary-fixed": "#410000",
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "secondary": "#735c00",
        "on-background": "#1e1b18",
        "on-surface-variant": "#5a413d",
        "on-primary-fixed-variant": "#8f0f07",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#efe6e2",
        "tertiary-fixed-dim": "#cdc6b8",
        "on-tertiary-fixed-variant": "#4b463c",
        "background": "#fff8f5",
        "outline": "#8e706c",
        "on-secondary-fixed-variant": "#574500",
        "on-tertiary-fixed": "#1e1b13",
        "on-secondary-container": "#745c00",
        "inverse-primary": "#ffb4a8",
        "surface-dim": "#e1d8d4",
        "secondary-fixed-dim": "#e9c349",
        "surface-tint": "#b22b1d",
        "tertiary-fixed": "#e9e2d3",
        "surface-container-highest": "#e9e1dc",
        "on-secondary": "#ffffff",
        "secondary-container": "#fed65b",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#f5ece7",
        "tertiary-container": "#403c32",
        "on-secondary-fixed": "#241a00",
        "on-tertiary-container": "#ada699",
        "on-primary": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-mobile": "20px",
        "gutter": "24px",
        "margin-desktop": "64px",
        "unit": "8px",
        "container-max": "1200px",
        "section-gap": "80px"
      },
      fontFamily: {
        "display-lg": ["var(--font-playfair-display)", "serif"],
        "headline-sm": ["var(--font-playfair-display)", "serif"],
        "label-caps": ["var(--font-plus-jakarta-sans)", "sans-serif"],
        "headline-md": ["var(--font-playfair-display)", "serif"],
        "body-md": ["var(--font-plus-jakarta-sans)", "sans-serif"],
        "body-lg": ["var(--font-plus-jakarta-sans)", "sans-serif"],
        "marathi-body": ["var(--font-plus-jakarta-sans)", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
