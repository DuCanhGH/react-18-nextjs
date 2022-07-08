import Link from "next/link";

const AppLinks = () => {
    return (
        <>
            <h2>Navigation:</h2>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/pikachu">Page with getServerSideProps (/pikachu)</Link>
                </li>
                <li>
                    <Link href="/a">Another page with getServerSideProps (/a)</Link>
                </li>
                <li>
                    <Link href="/b">A page with getStaticProps (/b)</Link>
                </li>
                <li>
                    <Link href="/blog/a">A page with getServerSideProps and CmtIO (/blog/a)</Link>
                </li>
            </ul>
        </>
    );
};

export default AppLinks;
