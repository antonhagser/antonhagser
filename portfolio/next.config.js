/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        serverActions: true,
    }
};

module.exports = async (phase, { defaultConfig }) => {
    const config = nextConfig;
    return config;
};
