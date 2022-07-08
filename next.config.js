// @ts-check
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pwa: {
        dest: "public",
        runtimeCaching,
        disable: process.env.NODE_ENV === "production" ? false : true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
    experimental: {
        runtime: "experimental-edge",
    },
};

module.exports = withPlugins([withPWA], nextConfig);
