/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "ellie-background":
          "url('https://images3.alphacoders.com/106/1065466.png')",
      },
      colors: {
        primary: "#e84338",
      },
    },
  },
  plugins: [],
};
