/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#493EFF",
        secondary: "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
