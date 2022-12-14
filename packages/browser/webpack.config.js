import HtmlWebpackPlugin from 'html-webpack-plugin';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/main.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    extensionAlias: { '.js': ['.tsx', '.ts', '.jsx', '.js'] },
  },
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: ['ts-loader'] }],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'public/index.html' })],
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
