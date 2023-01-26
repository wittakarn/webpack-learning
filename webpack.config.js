const path = require('path');

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
        default: {
          idHint: "",
          reuseExistingChunk: true,
          minChunks: 2,
          priority: -20
        },
        defaultVendors: {
          idHint: "vendors",
          reuseExistingChunk: true,
          test: isDefaultVendorsMatch,
          priority: -10
        }
      }
    },
  },
  context: __dirname,
};

module.exports = config;
