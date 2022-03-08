module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['plugin:effector/recommended', 'plugin:effector/scope', 'plugin:prettier/recommended'],
  plugins: ['effector', 'simple-import-sort', 'import'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^(@app|#types)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
