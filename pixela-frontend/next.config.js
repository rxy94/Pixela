/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// PRODUCTION: const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/series/:path*',
                destination: 'http://localhost/api/series/:path*',
                // PRODUCTION: destination: `${backendApiUrl}/series/:path*`,
            },
            {
                source: '/api/movies/:path*',
                destination: 'http://localhost/api/movies/:path*',
                // PRODUCTION: destination: `${backendApiUrl}/movies/:path*`,
            },
        ];
    },
    images: {
        domains: [
            'image.tmdb.org', 
            'via.placeholder.com', 
            'img.youtube.com',
            'laravel.test',
            'localhost',
            'i.pravatar.cc',
            'picsum.photos',
            'pixela.duckdns.org'
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[contenthash].css',
                    chunkFilename: 'static/css/[id].[contenthash].css',
                })
            );
        }
        return config;
    },
};

module.exports = nextConfig; 