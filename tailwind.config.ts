import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#1B3A5C",
        secondary: "#C8873A",
        accent:    "#4CAF7D",
        warning:   "#E8A020",
        danger:    "#D94F3D",
        surface:   "#F7F5F2",
        "text-main":  "#1A1A1A",
        "text-muted": "#6B7280",
        border:    "#E5E0D8",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
        sans:    ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        card:  "0 2px 16px rgba(27, 58, 92, 0.08)",
        hover: "0 8px 32px rgba(27, 58, 92, 0.16)",
        "xl-colored": "0 12px 40px rgba(27, 58, 92, 0.20)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1B3A5C 0%, #2d5a8e 60%, #1B3A5C 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
