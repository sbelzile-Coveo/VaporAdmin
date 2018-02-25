const webpack = require("webpack");

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          enforce: 'post',
          test: /src\/(?:(?!Examples)(?!spec)(?!tests)(?!Utils).)*\..+$/i,
          exclude: /(node_modules)/,
          loader: 'istanbul-instrumenter-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('test'),
      }),
      new webpack.SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|tsx|js)($|\?)/i // process .js and .ts files only
      })
    ]
  };
  
