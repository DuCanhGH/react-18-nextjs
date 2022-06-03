/* eslint-disable */
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

// required for Hash-based CSP to work with ISR on Vercel
export const config = {
    unstable_includeFiles: [".next/static/chunks/**/*.js"],
};

export const getStaticProps = async () => {
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
            {!revalidated ? "Change it / revalidate!" : "Revalidated! Click to Reload the page"}
        </button>
    );
};
const Page = ({ random }) => {
    return (
        <>
            <>
                <h1>A Page with getStaticProps</h1>
                <p>
                    A random number generated at build-time that doesn't change: {random}. Don't
                    like that number? Then try the new Next 12.1 on-demand ISR feature:
                </p>
                <p>
                    <RevalidateButton />
                </p>
                <p>
                    It get's prerendered at build-time and has no access to request and response
                    data. Can't use a Nonce-based CSP here, because it doesn't rerender per request.
                    Must use a Hash-based CSP.
                </p>
                <h2>Internal navigation to other pages</h2>
                <ul>
                    <li>
                        <Link href="/isr/lazy-slug">
                            <a>
                                Page with getStaticProps + <code>revalidate</code> (ISR)
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dynamic-page">Page with getServerSideProps</Link>
                    </li>
                </ul>
            </>
        </>
    );
};

export default Page;
