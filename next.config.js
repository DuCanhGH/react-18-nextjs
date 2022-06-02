// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
        config.experiments = { asyncWebAssembly: true };
        return config;
    },
};

module.exports = nextConfig;
