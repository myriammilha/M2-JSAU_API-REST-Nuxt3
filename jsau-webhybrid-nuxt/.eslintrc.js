module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    module: "writable",
    defineNuxtConfig: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
  },
  ignorePatterns: [".nuxt/", "dist/", "node_modules/"],
};
