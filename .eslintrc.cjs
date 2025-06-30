/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true, // Enables browser globals (window, document, etc.)
    es2021: true, // Enables ES2021 globals and syntax
  },
  parser: '@typescript-eslint/parser', // Use TypeScript-aware parser
  parserOptions: {
    ecmaVersion: 'latest', // Allow modern ECMAScript features
    sourceType: 'module', // Enable ECMAScript modules
    project: './tsconfig.json', // Required for certain TS rules (e.g. type-aware linting)
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb', // Airbnb base JS style
    'airbnb-typescript', // Airbnb rules for TypeScript
    'airbnb/hooks', // Airbnb React Hooks rules
    'plugin:react/recommended', // Recommended React rules
    'plugin:@typescript-eslint/recommended', // TS-specific rules
    'plugin:prettier/recommended', // Prettier plugin + turns off conflicting rules
  ],
  rules: {
    // ✅ Common Overrides
    'react/react-in-jsx-scope': 'on',
    'prettier/prettier': ['error'], // Enforce Prettier formatting as ESLint errors

    // Optional Relaxations:
    // 'import/prefer-default-export': 'off', // Uncomment if you prefer named exports
    // '@typescript-eslint/no-unused-vars': ['warn'], // Less aggressive on unused vars
    // 'react/jsx-props-no-spreading': 'off', // Allow props spreading in JSX
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
};
