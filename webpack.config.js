const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDevelopment ? "bundle.js" : "bundle.min.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: "defaults",
                    },
                  ],
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ico)$/,
          exclude: /node_modules/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./",
            publicPath: "./",
            emitFile: false,
          },
        },
      ],
    },
    optimization: {
      minimize: !isDevelopment,
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        filename: "index.html",
        inject: "body",
        favicon: path.resolve(__dirname, "public", "favicon.ico"),
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
