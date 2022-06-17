// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
import withPlugins from "next-compose-plugins";

const nextConfig = withPlugins([withPWA], {
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
});

export default nextConfig;