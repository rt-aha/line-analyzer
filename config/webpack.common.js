require('dotenv').config();

const glob = require('glob');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { errorLog,importantLog } = require('./utils');

const getEntry = () => {
  const entry = {};
  glob.sync('./src/js/*.js').forEach((name) => {
    const start = name.indexOf('/src/js/') + 8; //前面路徑共8個位元的字串，設定的資料夾路徑不同，也要記得更改位元數喔!
    const end = name.length - 3; //減去附檔名 .js 共三個位元的字串
    const eArr = [];
    const n = name.slice(start, end); //取得每個js的名稱
    eArr.push(name); //push至陣列中
    entry[n] = eArr; //就會產生多筆入口的陣列囉！
  });
  return entry;
};

const fileList = Object.keys(getEntry());

// 若沒有任何模板就跳開
if (fileList.length === 0) {
  console.log(errorLog('ℹ Please run command `sh sh/init.sh` first!!'));
  throw new process.exit(1);
}

const config = {
  devtool: 'cheap-eval-source-map',
  entry: getEntry(),
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[hash:8].js', // js ouput到dist資料夾的位置
    chunkFilename: 'js/[name].shared.js', // js ouput到dist資料夾的位置
  },
  module: {
    rules: [
      // 在index.js中引入 .html，使hot reload生效
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: true,
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false, // 不壓縮 HTML
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true, // 美化 HTML 的編排 (不壓縮HTML的一種)
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        loader: 'url-loader',
        options: {
          // 用以限制須轉為 base64 的文件大小 (單位：byte)
          limit: 8192,
          // 超過大小及調用 file-loader
          fallback: require.resolve('file-loader'),
        },
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/fonts/',
        },
      },
      // 將js轉為es5語法
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/[name].css', // css ouput到dist資料夾的位置
      chunkFilename: '[id].css',
    }),
    new WebpackBar()
  ],
  resolve: {
    alias: {
      '@': path.resolve('src/'),
    },
  },
  stats: {
    excludeModules: "mini-css-extract-plugin"
  },
};


fileList.forEach((name) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: `./src/template/${name}.${process.env.ENV_TYPE.toLowerCase()}`,
      filename: `${name}.html`,
      chunks: ['common', 'runtime', 'vendor', 'action', `${name}`],
      minify: {
        removeComments: true,
        collapseWhitespace: true, // 壓縮 HTML
        removeAttributeQuotes: true,
      },
    }),
  );
});

module.exports = config;
