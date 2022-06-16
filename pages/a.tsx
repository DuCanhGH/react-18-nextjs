//Copied from Nibtime's demo. This file has been editted.
import { GetServerSideProps } from "next";
import { OutgoingHttpHeaders, IncomingHttpHeaders } from "http2";
import { Suspense } from "react";

interface Props {
    requestHeaders: IncomingHttpHeaders;
    responseHeaders: OutgoingHttpHeaders;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    return {
        props: {
            requestHeaders: ctx.req?.headers,
            responseHeaders: ctx.res?.getHeaders(),
        },
    };
};

const Page = (props: Props) => {
    const { requestHeaders, responseHeaders } = props;
    return (
        <Suspense fallback={null}>
            <h1>A page that uses getServerSideProps</h1>
            <p>
                It gets prerendered per request; therefore, it has access to request and response
                data.
            </p>
            <p>
                {
                    "That's why it can use nonce-based CSP, it has the ability to set a fresh nonce as an attribute to scripts and links every request."
                }
            </p>
            <h2>Request headers</h2>
            <pre>{JSON.stringify(requestHeaders, null, 2)}</pre>
            <h2>Response headers</h2>
            <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
        </Suspense>
    );
};

export default Page;
