import js from '@eslint/js'
import reactThree from '@react-three/eslint-plugin'
import react from 'eslint-plugin-react'
import globals from 'globals'

const config = [
  js.configs.recommended,
  js.configs.all,
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@react-three/recommended',
  ),
  {
    plugins: {
      react,
      '@react-three': reactThree,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        require: true,
        document: true,
        console: true,
      },

      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
    },

    rules: {
      'no-console': [
        'error',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],

      'no-unused-expressions': 'warn',
      'array-callback-return': 'warn',
      'no-param-reassign': 'error',
      'react/jsx-no-comment-textnodes': 'error',

      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
        },
      ],

      'no-useless-escape': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',

      'no-shadow': [
        'error',
        {
          builtinGlobals: true,
        },
      ],

      'react/prop-types': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unknown-property': 'off',
    },
  },
]

export default config
