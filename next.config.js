// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        emotion: true,
    },
};

module.exports = nextConfig;
