import { chain, nextSafe, csp, strictDynamic, reporting } from "@next-safe/middleware";

const isDev = process.env.NODE_ENV !== "production";

const reportingMiddleware = reporting(() => {
    const nextApiReportEndpoint = `/api/reporting`;
    return {
        csp: {
            reportUri: nextApiReportEndpoint,
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

const securityMiddleware = [
    nextSafe({ isDev, disableCsp: true }),
    csp({
        isDev,
        directives: {
            "default-src": ["self", "blob:", "https://pokeapi.co"],
            "img-src": ["self", "https://pokeapi.co"],
            "connect-src": ["self", "https://pokeapi.co"],
            "style-src": ["self", "unsafe-inline"],
            "script-src": ["self"],
        },
        reportOnly: isDev,
    }),
    strictDynamic(),
    reportingMiddleware,
];

export default chain(...securityMiddleware);
