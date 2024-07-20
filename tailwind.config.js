/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        platform: ["Open Sans", "sans-serif"],
      },
      padding: {
        bigscreen: "40px",
      },
    },
  },
  plugins: [],
};
