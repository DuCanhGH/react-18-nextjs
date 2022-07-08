import Link from "next/link";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <main>
                <Link href="/pikachu">Pikachu</Link>
            </main>
        </>
    );
}
