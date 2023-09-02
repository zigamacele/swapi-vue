module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'no-async-promise-executor': 'warn',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
}
