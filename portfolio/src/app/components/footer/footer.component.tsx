import clsx from 'clsx';
import Link from 'next/link';

import Social from '../social/social.component';

import commonStyles from '../../styles/common.module.css';
import styles from './footer.module.css';

interface Props {
    className?: string;
}

export default function Footer({ className }: Props) {
    return (
        <footer className={className}>
            <footer
                className={clsx(commonStyles.headerContainer, styles.footer)}
            >
                <nav className={clsx(styles.footerLinks)}>
                    <Link href="/about" className={styles.footerLink}>
                        About
                    </Link>
                    <Link href="/projects" className={styles.footerLink}>
                        Projects
                    </Link>
                    <Link href="/contact" className={styles.footerLink}>
                        Contact
                    </Link>
                </nav>
                <div className={styles.footerSocials}>
                    <Social
                        type="icon"
                        brand="GitHub"
                        value="@antonhagser"
                        url="https://github.com/antonhagser"
                        className={styles.footerSocial}
                    />
                    <Social
                        type="icon"
                        brand="LinkedIn"
                        value="@anton-hagser"
                        url="https://www.linkedin.com/in/anton-hagser/"
                        className={styles.footerSocial}
                    />
                </div>
                <div className={styles.footerCopyright}>
                    <p>© 2023 Anton Hagsér</p>
                </div>
            </footer>
        </footer>
    );
}
