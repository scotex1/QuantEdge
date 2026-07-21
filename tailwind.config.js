/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0A0D12",
          900: "#0F131A",
          850: "#141922",
          800: "#1A202C",
          700: "#262D3A",
          600: "#3A4354",
        },
        ink: {
          100: "#F2F4F7",
          300: "#C4CAD6",
          500: "#8B93A5",
          700: "#5A6273",
        },
        signal: {
          DEFAULT: "#F2B705",
          dim: "#B88A04",
          light: "#FFD34D",
        },
        bull: {
          DEFAULT: "#22C55E",
          dim: "#16341F",
        },
        bear: {
          DEFAULT: "#EF4444",
          dim: "#3A1A1A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(242,183,5,0.06), transparent 60%)",
      },
    },
  },
  plugins: [],
};
