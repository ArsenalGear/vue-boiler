module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    sourceType: 'module'
  },

  plugins: ['@typescript-eslint', 'import'],

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],

  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'default-param-last': 'off',
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'func-names': 0,
    'default-case': 0,
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'no-nested-ternary': 0,
    'vue/require-default-prop': 'off',
    camelcase: 'off'
  }
}
