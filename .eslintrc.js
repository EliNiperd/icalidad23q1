const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'next', 'standard', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': RULES.OFF,
    // 'react/jsx-uses-react': RULES.OFF,
    'react/prop-types': RULES.OFF,
    'jsx/ts.implicitProjectConfig.checkJs': RULES.OFF,
    'react/no-unescaped-entities': RULES.OFF,
    'no-restricted-exports': RULES.OFF,
  },
};
