import Image from 'next/image';
import { Suspense } from 'react';
import Main from 'components/main';
import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js!</a>
        </h1>
        <Suspense fallback={<p className={styles.description}>Loading...</p>}>
          <Main />
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};
