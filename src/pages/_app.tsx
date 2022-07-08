import "@/scripts/wdyr";
import "@/scripts/axe_core";
import "@/styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import Head from "next/head";
import AppLinks from "@/components/links";

export function reportWebVitals(metrics: NextWebVitalsMetric) {
    if (process.env.NODE_ENV !== "production") {
        console.debug(metrics);
    }
}

export default function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Next.js</title>
                <link rel="manifest" href="/manifest.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB" />
            </Head>
            <SWRConfig
                value={{
                    revalidateOnFocus: false,
                    fetcher: (url, args) => axios.get(url, args).then((res) => res.data),
                }}
            >
                <Component {...pageProps} />
                <AppLinks />
            </SWRConfig>
        </>
    );
}
