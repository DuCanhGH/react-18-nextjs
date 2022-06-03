//Copied from Nibtime's demo. This file has been editted.
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { GetStaticProps } from "next";

// according to author: required for Hash-based CSP to work with ISR on Vercel
export const config = {
    unstable_includeFiles: [".next/static/chunks/**/*.js"],
};

interface Props {
    random: number;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const random = Math.random() * 100;
    return { props: { random } };
};

const RevalidateButton = () => {
    const { pathname } = useRouter();
    const [revalidated, setRevalidated] = useState(false);
    const onClick = useCallback(async () => {
        if (!revalidated) {
            const res = await fetch(
                `/api/revalidate?pathname=${pathname}&secret=this should be a real secret`,
                {
                    method: "get",
                },
            );
            if (res.ok) {
                const { revalidated } = await res.json();
                setRevalidated(revalidated || false);
            } else {
                setRevalidated(false);
            }
        } else {
            window.location.reload();
        }
    }, [pathname, revalidated]);

    return (
        <button type="button" onClick={onClick}>
            {!revalidated ? "Change it/revalidate!" : "Revalidated! Click to Reload the page"}
        </button>
    );
};

const Page = (props: Props) => {
    const { random } = props;
    return (
        <>
            <>
                <h1>A page that uses getStaticProps</h1>
                <p>{"A random number generated at build-time that doesn't change: " + random}.</p>
                <p>
                    <RevalidateButton />
                </p>
                <p>
                    {
                        "This page gets prerendered at build-time and has no access to request and response data. Can't use a nonce-based CSP here, because it doesn't rerender per request. Must use a hash-based CSP."
                    }
                </p>
                <h2>Navigation to other pages:</h2>
                <ul>
                    <li>
                        <Link href="/pikachu">Page with getServerSideProps</Link>
                    </li>
                    <li>
                        <Link href="/a">Another page with getServerSideProps</Link>
                    </li>
                </ul>
            </>
        </>
    );
};

export default Page;
