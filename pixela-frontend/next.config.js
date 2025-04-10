/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/series/:path*',
                destination: 'http://laravel.test/api/series/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'laravel.test',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['image.tmdb.org'],
    },
};

module.exports = nextConfig; 