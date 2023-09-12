import Link from 'next/link';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import styles from './styles/error.module.css';
import clsx from 'clsx';
import commonStyles from './styles/common.module.css';

export default function NotFound() {
    return (
        <>
            <Header />
            <section
                className={clsx(
                    commonStyles.headerContainer,
                    styles.errorCodeWrapper
                )}
            >
                <div className={styles.errorCodeInner}>
                    <h2 className={styles.errorCode}>404</h2>
                </div>

                <Link href="/" className={styles.errorCodeReturnButton}>
                    <span className={styles.errorCodeReturnButtonText}>
                        Return to homepage
                    </span>
                </Link>
            </section>
            <Footer />
        </>
    );
}
