import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/main.tsx',
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
    extensionAlias: { '.js': ['.tsx', '.ts', '.jsx', '.js'] },
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }] },
      { test: /\.svg$/, issuer: /\.[jt]sx?$/, use: '@svgr/webpack' },
      { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles/[contenthash].css' }),
  ],
  optimization: { minimizer: ['...', new CssMinimizerWebpackPlugin()] },
  output: {
    path: resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
    filename: 'scripts/[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: 'public',
    },
    historyApiFallback: true,
  },
};
