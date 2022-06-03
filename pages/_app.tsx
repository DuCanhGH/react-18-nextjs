import { type AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import "~/scripts/wdyr";
import "~/scripts/axe_core";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
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
            </SWRConfig>
        </>
    );
}
