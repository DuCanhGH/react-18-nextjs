import { chain, nextSafe, strictDynamic, reporting } from "@next-safe/middleware";

const isDev = process.env.NODE_ENV !== "production";

const reportOnly = !!process.env.CSP_REPORT_ONLY;

const middleware = nextSafe((req) => {
    const { origin } = req.nextUrl;
    return {
        isDev,
        contentSecurityPolicy: {
            reportOnly: reportOnly ?? true,
            "default-src": ["'self' blob:", origin, "https://pokeapi.co"],
            "img-src": ["'self'", origin, "https: data:"],
            "connect-src": ["'self'", origin, "https://pokeapi.co"],
            "style-src": ["'self'", "'unsafe-inline'", origin],
            "script-src": ["'self'", origin],
        },
    };
});

const reportingMiddleware = reporting((req) => {
    const nextApiReportEndpoint = `/api/reporting`;
    return {
        csp: {
            reportUri: process.env.CSP_REPORT_URI || nextApiReportEndpoint,
        },
        reportTo: {
            max_age: 1800,
            endpoints: [
                {
                    url: process.env.REPORT_TO_ENDPOINT_DEFAULT || nextApiReportEndpoint,
                },
            ],
        },
    };
});

export default chain(middleware, strictDynamic(), reportingMiddleware);
