import {
    chain,
    chainMatch,
    nextSafe,
    isPageRequest,
    csp,
    strictDynamic,
    reporting,
} from "@next-safe/middleware";

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
            "object-src": ["none"],
            "base-uri": ["none"],
            "img-src": ["self", "https://pokeapi.co"],
            "connect-src": ["self", "https://pokeapi.co"],
            "style-src": ["self", "unsafe-inline"],
            "worker-src": ["self"],
        },
        reportOnly: isDev,
    }),
    strictDynamic(),
    reportingMiddleware,
];

export default chain(/*Insert middleware here*/ chainMatch(isPageRequest)(...securityMiddleware));

export const config = {
    runtime: "experimental-edge",
};
