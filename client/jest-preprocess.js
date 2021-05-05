const babelOptions = {
  presets: ['next/babel']
};

module.exports = require('babel-jest').createTransformer(babelOptions);
