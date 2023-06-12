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
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    sourceType: 'module'
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0
  }
}
