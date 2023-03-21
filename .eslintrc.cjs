/* eslint-env node */
module.exports = {
  root: true,
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    'prettier',
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    '@vue/eslint-config-typescript'
    // '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: '2020'
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "no-unused-vars": "off",
    "max-len": [
      2,
      {
        "code": 100,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreTrailingComments": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "vue/html-self-closing": [
      "error",
      {
        "html": {
          "void": "always",
          "normal": "always",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }
    ],
    "vue/max-len": [
      "error",
      {
        "template": 100,
        "ignoreStrings": true,
        "code": 100,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreTrailingComments": false
      }
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": 0,
    "vue/prop-name-casing": 0,
    "no-debugger": "warn",
    "camelcase": 0,
    "vue/multiline-html-element-content-newline": 1
  }
}
