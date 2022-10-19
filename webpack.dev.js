import common from './webpack.common.js';
import path from 'node:path';
import {merge} from 'webpack-merge';

const localProxy = {
    target: {
        host: 'petroglyphwatch.com',
        protocol: 'https:',
        port: 443
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

export default merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        historyApiFallback: true,
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: process.cwd(), watch: false}
        ],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/images/': {...localProxy}
        }
    },
    devtool: 'eval-source-map',
    plugins: [
        // new BundleAnalyzerPlugin(),
    ]
});
