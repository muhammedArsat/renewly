/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        light: {
          background: "#F5F7FA",
          card: "#FFFFFF",
          text: "#000000",
          textSecondary: "#4B5563",
          border: "#E5E7EB",
          button: "#7F56D9",
          success: "#22C55E",
          error: "#EF4444",
          active: "#bca1f7",
        },
        dark: {
          background: "#1A1B1F",
          card: "#2A2B30",
          text: "#F2F3F5",
          textSecondary: "#A0A5B4",
          border: "#3A3B42",
          button: "#9D7CFF",
          success: "#16A34A",
          error: "#DC2626",
          active: "#b79eff",
        },
      },
      boxShadow: {
        light: "0 4px 12px rgba(0, 0, 0, 0.05)",
        dark: "0 4px 12px rgba(0, 0, 0, 0.4)",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
