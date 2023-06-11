module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential'
    // "plugin:storybook/recommended",
    // "plugin:markdown/recommended",
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
