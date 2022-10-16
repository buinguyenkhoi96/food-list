const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@share': path.resolve(__dirname, 'src/'),
    }
  },
};
