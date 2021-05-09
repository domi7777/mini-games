const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: path.resolve(__dirname, './src/main.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(mp3|ogg)$/,
                use: 'file-loader',
            }
        ],

    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html'
        })
    ]
};
