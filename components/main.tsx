import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import { Fragment } from 'react';

const Main = () => {
    const { data } = useSWR("/api/hello", url => fetch(url).then(r => r.json()));
    return (
        <p className={styles.description}>
            This app is using: <br />
            {data?.map(
                (a: string) => {
                    return (
                        <Fragment key={a}>
                            {a} {" "}
                        </Fragment>
                    )
                }
            )}
        </p>
    );
};

export default Main;