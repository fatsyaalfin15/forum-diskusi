export default {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};