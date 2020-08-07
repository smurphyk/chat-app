module.exports = {
  env: {
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  extends:
    'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBufer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
  },
};
