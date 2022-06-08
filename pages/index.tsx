import Link from "next/link";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <main>
                <div>
                    <Link href="/pikachu">
                        <a>Pikachu</a>
                    </Link>
                </div>
            </main>
        </>
    );
}
