import { chain, nextSafe, strictDynamic } from "@next-safe/middleware";

const isDev = process.env.NODE_ENV !== "production";

const middleware = nextSafe((req) => {
    const { origin } = req.nextUrl;
    return {
        isDev,
        contentSecurityPolicy: {
            "default-src": ["'self' blob:", origin, "https://pokeapi.co"],
            "img-src": ["'self'", origin, "https: data:"],
            "connect-src": ["'self'", origin, "https://pokeapi.co"],
            "style-src": ["'self'", "'unsafe-inline'", origin],
            "script-src": ["'self'", origin],
        },
    };
});

export default chain(middleware, strictDynamic());
