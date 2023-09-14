import Link from 'next/link';

import styles from './button.module.css';
import ExternalLinkIcon from '@/app/icons/external-link';
import clsx from 'clsx';
import { Tech, getBrandIcon } from '../tech/tech.component';

interface Props {
    icon?: JSX.Element | Tech;

    url?: string;
    value?: string;
    onClick?: () => void;

    className?: string;
}

export default function ProjectHeaderButton({
    icon,
    url,
    value,
    onClick,
    className,
}: Props) {
    const decidedIcon = () => {
        if (typeof icon === 'string') {
            return getBrandIcon(icon, styles.icon)[0];
        } else if (icon) {
            return icon;
        } else if (url && !icon) {
            return <ExternalLinkIcon className={styles.icon} />;
        } else {
            return <></>;
        }
    };

    return (
        <>
            {url ? (
                <Link
                    className={clsx(styles.button, className)}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {decidedIcon()}
                    {value ? <span>{value}</span> : <></>}
                </Link>
            ) : (
                <button
                    className={clsx(styles.button, className)}
                    onClick={onClick}
                >
                    {decidedIcon()}
                    {value ? <span>{value}</span> : <></>}
                </button>
            )}
        </>
    );
}
