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
        defaultVendors: {
          name: 'vendor',
          // We could have also set this property as: `splitChunks.minSize: 0`,
          // since this property is inherited(by default) by the cache groups.
          minSize: 0,

          // Enforcing the minimum number of chunks that request a module.
          minChunks: 2,

          // Q: What kind of modules should new chunks contain?
          // A: Modules that come from `node_modules`
          test: /node_modules/,
        },
        commons: {
          name: 'common',
          minChunks: 3,
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
