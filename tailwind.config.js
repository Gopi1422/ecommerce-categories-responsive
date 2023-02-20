/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        118: "118px",
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        118: "118px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headerBg: "#FFE475",
        headingColor: "#2e2e2e",
        textColor: "#100E3A",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        secondaryBlue: "#5DA9E9",
        neutralGray: "#737D94",
        categoryNeutralGray: "#B6BAC3",
        cardOverlay: "rgba(256,256,256,0.4)",
        lightGray: "#EDEDED",
        card: "rgba(256,256,256,0.8)",
        cartBtnBg: "#40D589",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp"),
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar-custom": {
          // overflowY: "auto",
          // scrollbarColor: `${theme("colors.blue.400")} ${theme(
          //   "colors.blue.200"
          // )}`,
          // scrollbarWidth: "thin",
        },
        ".scrollbar-custom::-webkit-scrollbar": {
          // height: "2px",
          width: "13px",
        },
        ".scrollbar-custom::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.secondaryBlue"),
          border: "3px solid transparent",
          borderRadius: "9px",
          backgroundClip: "content-box",
          // backgroundColor: "#5DA9E9",
        },
        ".scrollbar-custom::-webkit-scrollbar-track-piece": {
          backgroundColor: theme("colors.gray.200"),
        },
      });
    }),
  ],
};
