// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import daStyle from 'eslint-config-dicodingacademy';

export default [{
  files: ['**/*.{js,mjs,cjs,jsx}'],
}, {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
}, pluginJs.configs.recommended, pluginReact.configs.flat.recommended, pluginReact.configs.flat['jsx-runtime'], daStyle, {
  settings: {
    react: {
      version: 'detect',
    },
  },
}, ...storybook.configs["flat/recommended"]];
