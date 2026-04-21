module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <- required for CRA
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(15deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "60%": { transform: "rotate(12deg)" },
          "80%": { transform: "rotate(-5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
