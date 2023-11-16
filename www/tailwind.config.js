/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        offset: "10px 10px 0px 0px rgba(0, 0, 0, 0.20)",
        button: "5px 5px 0px 0px rgba(0, 0, 0, 0.20)",
      },
      colors: {
        primarydark: "#1e293b",
        secondarydark: "#475569",
      },
    },
  },
  plugins: [],
};
