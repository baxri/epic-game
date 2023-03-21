/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "ellie-background":
          "url('https://ik.imagekit.io/epicgame/epic-game/bg.png?tr=bl-5,w-1600,h-900')",
        "arena-background":
          "url('https://ik.imagekit.io/epicgame/epic-game/arena-bg.jpg?tr=bl-5,w-1600,h-900')",
      },
      colors: {
        primary: "#e84338",
      },
    },
  },
  plugins: [],
};
