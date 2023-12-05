import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        foreground: "#F7F7F7",
      },
    },
  },

  plugins: [],
} satisfies Config;
