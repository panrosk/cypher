/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        platform: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        small: "16px",
      },
      padding: {
        bigscreen: "40px",
      },
    },
  },
  plugins: [],
};
