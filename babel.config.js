module.exports = (api) => {
  const isDev = api.env('development');

  api.cache(isDev);

  const plugins = [
    isDev
      ? ['effector-logger/babel-plugin', { effector: { factories: ['createDeleteModal'] } }]
      : ['effector/babel-plugin', { factories: ['createDeleteModal'] }],
  ];

  return {
    plugins,
  };
};
