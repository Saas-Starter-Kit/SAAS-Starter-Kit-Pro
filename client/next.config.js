module.exports = {
  async rewrites() {
    return [
      {
        source: '/routes/:any*',
        destination: '/routes'
      }
    ];
  }
};
