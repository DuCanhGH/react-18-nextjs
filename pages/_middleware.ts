import { chain, nextSafe, strictDynamic, strictInlineStyles, reporting } from "@next-safe/middleware";

const isDev = process.env.NODE_ENV !== "production";

const reportOnly = !!process.env.CSP_REPORT_ONLY;

const middleware = nextSafe((req) => {
    const { origin } = req.nextUrl;
    return {
        isDev,
        contentSecurityPolicy: {
            reportOnly: reportOnly ?? true,
            "default-src": ["blob:", origin, "https://pokeapi.co"],
            "img-src": [origin, "https://pokeapi.co"],
            "connect-src": [origin, "https://pokeapi.co"],
            "script-src": origin,
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

export default chain(middleware, strictDynamic(), strictInlineStyles({ extendStyleSrc: false }), reportingMiddleware);
