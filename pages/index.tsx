import Link from "next/link";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <main className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
                <div className="flex justify-center items-center gap-5">
                    <Link href="/pikachu">
                        <a className="flex items-center justify-center rounded-md border border-transparent bg-gray-900 dark:bg-white px-4 py-3 text-base font-medium text-white dark:text-blue-700 shadow-sm hover:bg-gray-700 dark:hover:bg-blue-50 sm:px-8">
                            Pikachu
                        </a>
                    </Link>
                </div>
            </main>
        </>
    );
}
