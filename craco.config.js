const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@source': path.resolve(__dirname, 'src/'),
    }
  },
};
