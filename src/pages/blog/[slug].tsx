import Head from "next/head";
import { GetServerSideProps } from "next";
import { CmtioIframe } from "@/components/CmtioIframe";

interface SSProps {
    url: string;
}

export const getServerSideProps: GetServerSideProps<SSProps> = async ({ resolvedUrl }) => {
    return {
        props: {
            url: resolvedUrl,
        },
    };
};

export default function Home(props: SSProps) {
    const { url } = props;
    return (
        <>
            <Head>
                <title>Nothing</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>Some content</p>
                <div id="cmtio-root">
                    <CmtioIframe url={url} />
                </div>
            </main>
        </>
    );
}
