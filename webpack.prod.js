import common from './webpack.common.js';
import {merge} from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {WebpackManifestPlugin} from 'webpack-manifest-plugin';

export default merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {ecma: 8},
                    compress: {ecma: 5, warnings: false, inline: 2},
                    mangle: {safari10: true},
                    output: {ecma: 5, comments: false, ascii_only: true}
                },
                parallel: true,
                extractComments: false,
                // cache: true,
            })
        ],
    },
    output: {
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
        new BundleAnalyzerPlugin(),
    ]
});
