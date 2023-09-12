import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import rustacean from '../../../../public/rustacean-flat-gesture.svg';

import commonStyles from '../../styles/common.module.css';
import styles from './header.module.css';

interface Props {
    className?: string;
}

export default function Header({ className }: Props) {
    return (
        <header className={clsx(commonStyles.headerContainer, styles.header)}>
            <Link className={styles.headerLogo} href="/">
                <Image
                    priority
                    src={rustacean}
                    alt="Rustacean logo"
                    className={styles.headerImage}
                />
                <h1 className={styles.headerTitle}>antonhagser</h1>
            </Link>
            <nav className={styles.headerLinks}>
                <Link href="/about" className={styles.navLinkRoot}>
                    <span className={styles.navLink}>About</span>
                </Link>
                <Link href="/projects" className={styles.navLinkRoot}>
                    <span className={styles.navLink}>Projects</span>
                </Link>
                <Link href="/contact" className={styles.navLinkRoot}>
                    <span className={styles.navLink}>Contact</span>
                </Link>
            </nav>
        </header>
    );
}
