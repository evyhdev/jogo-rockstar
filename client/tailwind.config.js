export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#091522",
        panel: "#0d172a",
        accent: "#d4a31a",
        success: "#31d07d",
        danger: "#e14c4c",
        warning: "#e1c241",
        info: "#4d8fe4",
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0,0,0,0.35)",
        glow: "0 0 20px rgba(212,163,26,0.2)",
      },
    },
  },
  plugins: [],
};
