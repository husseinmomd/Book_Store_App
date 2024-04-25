module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
      },
    ],
    // 'react-native-reanimated',
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins:plugins
  };
};
