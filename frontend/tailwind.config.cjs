/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.js,.jsx,.ts,.tsx}"],
  theme: {
    extend: {
      colors: {
        login: "#E5E1DA",
        register: "#E5E1DA",
        primary: "rgba(0 0 0 / 0.1)",
        secondary: "rgba(0 0 0 / 0.6)",
        "empty-chat": "rgb(0 0 0 / 40%)",
        navbg: "rgba(0, 0, 0, .5)",
        dodger: "#1e90ff",
      },
      fontFamily: {
        heading: "cursive",
      },
      screens: {
        mobile: { max: "550px" },
      },
    },
  },
  plugins: [],
};
