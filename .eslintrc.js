module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  plugins: ["prettier"],
  extends: ["airbnb", "prettier", "prettier/react"],
  rules: {
    "prettier/prettier": ["error"],
    "react/require-default-props": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/prop-types": ["off"]
  }
};
