/** @type {import("prettier").Config} */
module.exports = {
  // File Resolution
  useEditorConfig: true, // Respect .editorconfig if present
  requirePragma: false, // Don't require /** @format */ to format a file
  requireConfig: true, // Only format files with a local config
  prettierPath: './node_modules/prettier/', // Explicit path to Prettier instance
  configPath: '.prettierrc.cjs', // Config file path
  ignorePath: '.prettierignore', // Ignore file path

  // Formatting Style
  bracketSameLine: true, // Put the `>` of a multiline JSX element at the end of the last line
  bracketSpacing: true, // Add space between brackets in object literals: { foo: bar }
  endOfLine: 'auto', // Use Unix-style line endings
  htmlWhitespaceSensitivity: 'ignore', // Ignore whitespace in HTML (good for React/JSX)

  // Syntax Preferences
  jsxSingleQuote: true, // Use single quotes in JSX
  singleQuote: true, // Use single quotes instead of double quotes
  semi: true, // Use semicolons
  tabWidth: 2, // Number of spaces per indentation-level
  useTabs: false, // Indent lines with spaces, not tabs
  trailingComma: 'es5', // Add trailing commas wherever valid in ES5 (objects, arrays, etc.)
  printWidth: 120, // Maximum line length (can be high for JSX-heavy code)
  quoteProps: 'as-needed', // Only quote object properties when required
  proseWrap: 'preserve', // Do not wrap markdown text (docs, comments)
  arrowParens: 'always', // Always include parens around arrow function params
  // embeddedLanguageFormatting: 'auto', // Format embedded languages like HTML in markdown/code

  // Other
  insertPragma: false, // Don't insert /** @format */ pragma
  enableDebugLogs: false, // Turn off debug logs from Prettier
  singleAttributePerLine: true, // Multiple JSX props per line (set true for stricter readability)
};
