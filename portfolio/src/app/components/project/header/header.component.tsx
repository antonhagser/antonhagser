import Link from 'next/link';
import styles from './header.module.css';
import clsx from 'clsx';
import ExternalLinkIcon from '@/app/icons/external-link-icon';

interface Props {
    title: string;
    hasDemo: boolean;
    demoURL?: string;

    className?: string;
}

export default function ProjectHeader({
    title,
    hasDemo,
    demoURL,
    className,
}: Props) {
    return (
        <div className={clsx(styles.projectHeader, className)}>
            <div className={styles.projectHeaderTop}>
                <div className={styles.projectHeaderTopLeft}>
                    <h2 className={styles.projectTitle}>{title}</h2>
                </div>
                {hasDemo && (
                    <Link
                        className={styles.projectDemoButton}
                        href={demoURL ? demoURL : '#'}
                    >
                        <ExternalLinkIcon className={styles.projectDemoIcon} />
                        <span>Launch Demo</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
