import Link from 'next/link';
import styles from './project.module.css';
import Image from 'next/image';

import tempMonkey from '../../../../public/temp.png';
import arrowRight from '../../../../public/icon-arrow-right.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import clsx from 'clsx';

interface Props {
    title: string;
    description: string;
    icon: string | StaticImport;
    link: string;
    isNew: boolean;

    className?: string;
}

export default function Project({
    title,
    description,
    icon,
    link,
    isNew = false,
    className,
}: Props) {
    return (
        <li className={clsx(styles.project, className)}>
            <Link href={link} className={styles.projectsListItemLink}>
                <div className={styles.projectRootLayout}>
                    <div className={styles.projectInfo}>
                        <div>
                            <Image
                                className={styles.projectIcon}
                                src={icon}
                                alt={description}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className={styles.projectAbout}>
                            <div className={styles.projectAboutTitle}>
                                <h3
                                    key="projectTitle"
                                    className={styles.projectTitle}
                                >
                                    {title}
                                </h3>
                                {isNew && (
                                    <div className={styles.projectNewLabel}>
                                        <label htmlFor="projectTitle" className={styles.projectNewLabelInner}>
                                            NEW
                                        </label>
                                    </div>
                                )}
                            </div>
                            <p className={styles.projectDesc}>{description}</p>
                        </div>
                    </div>
                    <div className={styles.projectButtonIcon}>
                        <Image src={arrowRight} alt={'Follow us on Twitter'} />
                    </div>
                </div>
            </Link>
        </li>
    );
}
