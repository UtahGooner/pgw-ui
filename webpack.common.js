import path from 'node:path';

export default {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: 'defaults'}],
                            '@babel/preset-react'
                        ]
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [],
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                chums: {
                    test: /[\\/](common|chums)-components[\\/]/,
                    name: 'chums',
                    chunks: 'all',
                },
            }
        }
    },
    output: {
        path: path.join(process.cwd(), 'public/js'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath: '/js',
    },
    target: 'web',
}
