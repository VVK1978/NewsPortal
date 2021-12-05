module.exports = (api) => {
  api.cache.using(() => process.env.npm_lifecycle_event);

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      [
        "@babel/plugin-transform-runtime",
        {
          regenerator: true,
        },
      ],
    ].filter(Boolean),
  };
};
