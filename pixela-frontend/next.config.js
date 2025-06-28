/** @type {import('next').NextConfig} */

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/series/:path*',
                //destination: 'http://localhost/api/series/:path*',
                destination: `${backendApiUrl}/series/:path*`,
            },
            {
                source: '/api/movies/:path*',
                //destination: 'http://localhost/api/movies/:path*',
                destination: `${backendApiUrl}/movies/:path*`,
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
};

module.exports = nextConfig; 