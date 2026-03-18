import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        __dirname: 'readonly',
        Buffer: 'readonly',
      },
    },
    ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'eslint.config.mjs'],
  },
];
