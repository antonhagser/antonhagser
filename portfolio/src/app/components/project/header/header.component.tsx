import Link from 'next/link';
import styles from './header.module.css';
import clsx from 'clsx';
import ExternalLinkIcon from '@/app/icons/external-link';
import HeaderButton from './button.component';
import { ReactNode, isValidElement } from 'react';
import React from 'react';
import GitHubIcon from '../../../icons/tech/github';

interface Props {
    title: string;

    children?: ReactNode;

    className?: string;
}

function validateChildren(children: ReactNode) {
    React.Children.forEach(children, (child) => {
        if (!isValidElement(child) || child.type !== HeaderButton) {
            throw new Error(
                'Only HeaderButton components are allowed as children.'
            );
        }
    });
}

export default function ProjectHeader({ title, children, className }: Props) {
    validateChildren(children);

    return (
        <div className={clsx(styles.projectHeader, className)}>
            <div className={styles.projectHeaderTop}>
                <div className={styles.projectHeaderTopLeft}>
                    <h2 className={styles.projectTitle}>{title}</h2>
                    {/* <Link href="/" className={styles.projectTitleGit}>
                        <GitHubIcon />
                    </Link> */}
                </div>

                <div className={styles.buttons}>{children}</div>
            </div>
        </div>
    );
}
