import path from 'path';

import { isLocalstack } from '@labset-platform-backend-core/configuration';
import { taxConfiguration } from '@labset-tax-backend/configuration';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { Configuration as DevConfiguration } from 'webpack-dev-server';

const mode = isLocalstack() ? 'development' : 'production';

const config: Configuration & DevConfiguration = {
    mode,
    devServer: {
        port: 7000
    },
    entry: {
        app: './entry/index.tsx'
    },
    target: 'web',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(sa?)?css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            __TAX_GATEWAY__: JSON.stringify({
                url: taxConfiguration.GATEWAY_URL
            })
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'entry', 'index.html'),
            favicon: path.resolve(__dirname, 'entry', 'tax-logo.png')
        })
    ]
};

// noinspection JSUnusedGlobalSymbols
export default config;
