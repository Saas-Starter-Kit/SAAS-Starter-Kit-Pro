module.exports = {
  async rewrites() {
    return [
      {
        source: '/app/:any*',
        destination: '/app'
      }
    ];
  }
};
