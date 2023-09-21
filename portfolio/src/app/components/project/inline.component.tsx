import Link from 'next/link';
import styles from './inline.module.css';
import Image from 'next/image';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import clsx from 'clsx';
import ChevronRightIcon from '@/app/icons/chevron-right';
import Label from '../label/label.component';

interface Props {
    title: string;
    description: string;
    icon: string | StaticImport;
    link: string;
    isNew?: boolean;
    hasDemo?: boolean;

    className?: string;
}

export default function InlineProject({
    title,
    description,
    icon,
    link,
    isNew = false,
    hasDemo = false,
    className,
}: Props) {
    return (
        <li className={clsx(styles.project, className)}>
            <Link href={link} className={styles.projectLink}>
                <div className={styles.projectRootLayout}>
                    <div className={styles.projectInfo}>
                        <Image
                            className={styles.projectIcon}
                            src={icon}
                            alt={description}
                            width={100}
                            height={100}
                        />
                        <div className={styles.projectAbout}>
                            <div className={styles.projectAboutTitle}>
                                <h3
                                    key="projectTitle"
                                    className={styles.projectTitle}
                                >
                                    {title}
                                </h3>
                                {isNew && <Label type="normal" label="NEW" />}
                                {hasDemo && <Label type="gold" label="DEMO" />}
                            </div>
                            <p className={styles.projectDesc}>{description}</p>
                        </div>
                    </div>
                    <div className={styles.projectButtonIcon}>
                        <ChevronRightIcon />
                    </div>
                </div>
            </Link>
        </li>
    );
}
