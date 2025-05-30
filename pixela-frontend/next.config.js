/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Para despliegue --> const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/series/:path*',
                destination: 'http://localhost/api/series/:path*',
                // Despliegue --> destination: `${backendApiUrl}/series/:path*`,
            },
            {
                source: '/api/movies/:path*',
                destination: 'http://localhost/api/movies/:path*',
                // Despliegue --> destination: `${backendApiUrl}/movies/:path*`,
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
            'picsum.photos'
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