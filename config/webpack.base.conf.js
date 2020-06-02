const path = require('path')
const SRC_PATH = path.resolve(__dirname, '../src')
const DIST_PATH = path.resolve(__dirname, '../server/dist')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'js/bundle.js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' }
        ],
        include: SRC_PATH,
      },
      {
        test: /(iconfont.svg)|\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',  // [path] 上下文环境路径
              publicPath: './assets/iconfont/',    // 公共路径
              outputPath: 'assets/iconfont/',  // 输出路径							
            }
          }				
        ]
      },
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', 'json'],
    alias: {
      '@': SRC_PATH,
      store: path.resolve(SRC_PATH, 'store'),
      images: path.resolve(SRC_PATH, 'assets/images'),
      styles: path.resolve(SRC_PATH, 'styles'),
      modules: path.resolve(SRC_PATH, 'modules'),
      utils: path.resolve(SRC_PATH, 'utils'),
    },
  },
}
