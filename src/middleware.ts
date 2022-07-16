import {
    chain,
    chainMatch,
    nextSafe,
    isPageRequest,
    csp,
    strictDynamic,
    strictInlineStyles,
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
            "style-src": ["self"],
            "child-src": ["none"],
            "font-src": ["self"],
            "form-action": ["self"],
            "frame-ancestors": ["none"],
            "frame-src": ["https://cmtio.vercel.app"],
            "manifest-src": ["self"],
            "media-src": ["self"],
            "prefetch-src": ["self"],
            "worker-src": ["self"],
        },
        reportOnly: isDev,
    }),
    strictDynamic(),
    strictInlineStyles({
        extendStyleSrc: true,
    }),
    reportingMiddleware,
];

export default chain(/*Insert middleware here*/ chainMatch(isPageRequest)(...securityMiddleware));

export const config = {
    runtime: "experimental-edge",
};
