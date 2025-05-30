const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: 'development',
    entry: {
        home: './src/pages/home/script.js',
        egov: './src/pages/e-governance/script.js',
        company: './src/pages/company/script.js',
        ai: './src/pages/ai/script.js',
        farm2plate: './src/pages/farm2plate/script.js',
        contact: './src/pages/contact/script.js',
        ecom: './src/pages/e-commerce/script.js',
        staffing: './src/pages/staffing/script.js',
        salesforce: './src/pages/salesforce/script.js',
        infracon: './src/pages/infracon/script.js',
        land: './src/pages/land/script.js',
        technology: './src/pages/technology/script.js',
        blog: './src/pages/blog/script.js',
        owc: './src/pages/owc/script.js',
        tamra: './src/pages/tamra/script.js',
        cloud: './src/pages/cloud/script.js',
        demo: './src/pages/demo/script.js',
        business: './src/pages/business/script.js',
        stress: './src/pages/stress/script.js',
        deepseek: './src/pages/deepseek/script.js',
        twin: './src/pages/twin/script.js',
        development: './src/pages/development/script.js',
        smartmeter: './src/pages/smart-metering/script.js',
        web: './src/pages/web/script.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/home/index.html',
            filename: 'home.html',
            chunks: ['home'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/e-governance/index.html',
            filename: 'egov.html',
            chunks: ['egov'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/company/index.html',
            filename: 'company.html',
            chunks: ['company'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/ai/index.html',
            filename: 'ai.html',
            chunks: ['ai'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/farm2plate/index.html',
            filename: 'farm2plate.html',
            chunks: ['farm2plate'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/contact/index.html',
            filename: 'contact.html',
            chunks: ['contact'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/e-commerce/index.html',
            filename: 'ecom.html',
            chunks: ['ecom'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/staffing/index.html',
            filename: 'staffing.html',
            chunks: ['staffing'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/salesforce/index.html',
            filename: 'salesforce.html',
            chunks: ['salesforce'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/infracon/index.html',
            filename: 'infracon.html',
            chunks: ['infracon'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/land/index.html',
            filename: 'land.html',
            chunks: ['land'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/technology/index.html',
            filename: 'technology.html',
            chunks: ['technology'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/owc/index.html',
            filename: 'owc.html',
            chunks: ['owc'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/blog/index.html',
            filename: 'blog.html',
            chunks: ['blog'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/tamra/index.html',
            filename: 'tamra.html',
            chunks: ['tamra'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/cloud/index.html',
            filename: 'cloud.html',
            chunks: ['cloud'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/demo/index.html',
            filename: 'demo.html',
            chunks: ['demo'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/business/index.html',
            filename: 'business.html',
            chunks: ['business'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/stress/index.html',
            filename: 'stress.html',
            chunks: ['stress'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/deepseek/index.html',
            filename: 'deepseek.html',
            chunks: ['deepseek'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/twin/index.html',
            filename: 'twin.html',
            chunks: ['twin'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/development/index.html',
            filename: 'development.html',
            chunks: ['development'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/smart-metering/index.html',
            filename: 'smartmeter.html',
            chunks: ['smartmeter'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/web/index.html',
            filename: 'web.html',
            chunks: ['web'],
            inject: true,
            minify: !isProduction && {
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeOptionalTags: true,
                removeScript: (node) => {
                    return node.src && node.src.includes('cdn-cgi/challenge-platform');
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/components/navigation.html', to: 'components/navigation.html' },
                { from: 'src/components/footer.html', to: 'components/footer.html' },
                { from: 'src/components/chatbot.html', to: 'components/chatbot.html' },
            ],
        }),
    ],
    externals: {
        gsap: 'gsap',
        ScrollTrigger: 'ScrollTrigger',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: '/home.html',
        hot: true,
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/home.html' },
                { from: /^\/home.html$/, to: '/home.html' },
                { from: /^\/e-governance.html$/, to: '/egov.html' },
                { from: /^\/company.html$/, to: '/company.html' },
                { from: /^\/ai.html$/, to: '/ai.html' },
                { from: /^\/farm2plate.html$/, to: '/farm2plate.html' },
                { from: /^\/contact.html$/, to: '/contact.html' },
                { from: /^\/e-commerce.html$/, to: '/ecom.html' },
                { from: /^\/staffing.html$/, to: '/staffing.html' },
                { from: /^\/salesforce.html$/, to: '/salesforce.html' },
                { from: /^\/infracon.html$/, to: '/infracon.html' },
                { from: /^\/land.html$/, to: '/land.html' },
                { from: /^\/technology.html$/, to: '/technology.html' },
                { from: /^\/owc.html$/, to: '/owc.html' },
                { from: /^\/blog.html$/, to: '/blog.html' },
                { from: /^\/tamra.html$/, to: '/tamra.html' },
                { from: /^\/cloud.html$/, to: '/cloud.html' },
                { from: /^\/demo.html$/, to: '/demo.html' },
                { from: /^\/business.html$/, to: '/business.html' },
                { from: /^\/stress.html$/, to: '/stress.html' },
                { from: /^\/deepseek.html$/, to: '/deepseek.html' },
                { from: /^\/twin.html$/, to: '/twin.html' },
                { from: /^\/development.html$/, to: '/development.html' },
                { from: /^\/smart-metering.html$/, to: '/smartmeter.html' },
                { from: /^\/web.html$/, to: '/web.html' },
            ],
        },
    },
};