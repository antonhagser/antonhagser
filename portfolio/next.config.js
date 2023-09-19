/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ];
    },
};

module.exports = async (phase, { defaultConfig }) => {
    const config = nextConfig;
    return config;
};
