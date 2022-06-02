// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    pwa: {
        dest: "public",
        runtimeCaching,
        disable: process.env.NODE_ENV === "production" ? false : true,
    },
});

module.exports = nextConfig;
