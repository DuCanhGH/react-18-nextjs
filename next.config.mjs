// @ts-check
import withPlugins from "next-compose-plugins";
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

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

export default withPlugins([withPWA], nextConfig);
