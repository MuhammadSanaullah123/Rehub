const spacings = {
  unset: "unset"
};
for (let i = -100; i < 500; i += 0.5) {
  spacings[i] = `${i / 4}rem`;
}

const opacities = {};
for (let i = 0; i < 100; i++) {
  opacities[i] = (i * 0.01).toFixed(2);
}

const colors = {
  primary: {
    DEFAULT: "#00b4ff",
    dark: "#4682b4"
  },
  secondary: {
    DEFAULT: "#a8a8a8"
  },
  success: {
    DEFAULT: "#499f52"
  },
  info: {
    DEFAULT: "#2FB4DD"
  },
  warning: {
    DEFAULT: "#f6921e"
  },
  danger: {
    DEFAULT: "#f64b1d",
    dark: "#cb0000"
  },
  blue: {
    light: "#274275",
    DEFAULT: "#102d66",
    700: "#112d66",
    e3: "#e3f2f8",
    34: "#3478bc"
  },
  gray: {
    DEFAULT: "#808184",
    cc: "#cccccc",
    97: "#979797",
    a8: "#a8a8a8",
    cd: "#cdcdcd",
    d9: "#d9d9d9",
    f5: "#f5f5f5"
  }
};

/** @type {import("tailwindcss").Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "xxxs": "374px",
        "xxs": "480px",
        "xs": "576px",
        "sm": "767px",
        "md": "992px",
        "lg": "1280px",
        "xl": "1440px",
        "max-xxxs": { max: "373px" },
        "max-xxs": { max: "479px" },
        "max-xs": { max: "575px" },
        "max-sm": { max: "766px" },
        "max-md": { max: "991px" },
        "max-lg": { max: "1279px" },
        "max-xl": { max: "1339px" }
      },
      colors,
      borderColors: colors,
      fontFamily: {
        primary: [
          "Helvetica",
          "Roboto, Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol"
        ],
        montserrat: [
          "Helvetica",
          "Roboto, Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol"
        ]
      },
      fontSize: {
        "md": "1rem",
        "3xs": "0.5rem",
        "9p": "0.5625rem",
        "2xs": "0.625rem",
        "11p": "0.6875rem",
        "13p": "0.8125rem",
        "15p": "0.9375rem",
      },
      spacing: spacings,
      minWidth: spacings,
      minHeight: spacings,
      maxWidth: spacings,
      maxHeight: {
        ...spacings,
        content: "fit-content"
      },
      borderWidth: {
        1.5: "1.5px"
      },
      opacity: opacities,
      zIndex: {
        "-1": -1,
        "1": 1,
        "100": 100,
        "max": 10000000
      },
      gridTemplateColumns: {
        "1fr-auto": "1fr auto",
        "auto-1fr": "auto 1fr"
      }
    },
  },
  plugins: [],
};
