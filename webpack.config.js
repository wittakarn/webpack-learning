const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

isDefaultVendorsMatch = (module) => {
  const matchPaths = ['a.js', 'b.js'];
  const isMatch = matchPaths.some(p => {
    const isFound = module.resource.includes(p);
    return isFound;
  });
  return isMatch;
}
/**
 * @type {import("webpack/types").Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    main: './src',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    // Instruct webpack not to obfuscate the resulting code
    minimize: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        defaultVendors: false,
        commons: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
  },
  context: __dirname,
  plugins: [
    new BundleAnalyzerPlugin()
  ],
};

module.exports = config;
