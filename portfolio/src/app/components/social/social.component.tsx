import LinkedinLogo from '@/app/icons/linkedin-icon';
import styles from './social.module.css';
import GithubLogo from '@/app/icons/github-icon';
import EmailIcon from '@/app/icons/email-icon';
import Link from 'next/link';
import clsx from 'clsx';
import VerifiedIcon from '../../icons/verified-icon';

type Type = 'full' | 'icon';
type Brands = 'GitHub' | 'LinkedIn' | 'Email';

interface Props {
    type: Type;
    brand: Brands;
    url: string;
    value: string;
    className?: string;
}

export default function Social({ type, brand, url, value, className }: Props) {
    function getBrandIcon(brandClassName?: string): JSX.Element {
        switch (brand) {
            case 'GitHub':
                return (
                    <GithubLogo
                        className={clsx(styles.socialLogo, brandClassName)}
                    />
                );
            case 'LinkedIn':
                return (
                    <LinkedinLogo
                        className={clsx(styles.socialLogo, brandClassName)}
                    />
                );
            case 'Email':
                return (
                    <EmailIcon
                        className={clsx(styles.socialLogo, brandClassName)}
                    />
                );
        }
    }

    return (
        <Link
            href={url}
            className={clsx(styles.social, className)}
            target="blank"
            rel="noopener noreferrer"
        >
            <div className={styles.socialLogo}>
                {getBrandIcon(styles.socialLogoInner)}
            </div>
            {type === 'full' && (
                <div className={styles.socialInfo}>
                    <div className={styles.socialTitleWrapper}>
                        <h3 className={styles.socialTitle}>{brand}</h3>
                        <VerifiedIcon className={styles.socialTitleVerifiedIcon} />
                    </div>
                    <p className={styles.socialValue}>{value}</p>
                </div>
            )}
        </Link>
    );
}
