module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-paper/babel'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.ios.js', '.android.js'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
