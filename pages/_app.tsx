import "../styles/globals.css";
import { type AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                fetcher: (url, args) => axios.get(url, args).then((res) => res.data),
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    );
}
