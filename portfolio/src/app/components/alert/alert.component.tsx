'use client';

import CloseIcon from '@/app/icons/close-icon';
import styles from './alert.module.css';
import clsx from 'clsx';
import { Alert, AlertProps } from './alertprovider.component';
import { useEffect, useState } from 'react';

export default function Alert({ alert, onDelete }: AlertProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isDeleting) {
            const timer = setTimeout(() => {
                onDelete();
            }, 200); // 200ms matches the transition duration

            return () => clearTimeout(timer);
        }
    }, [isDeleting, onDelete]);

    function getColorClassName(stroke: boolean = false): string {
        if (!stroke) {
            switch (alert.color) {
                case 'error':
                    return styles.alertError;
                case 'info':
                    return styles.alertInfo;
                case 'warning':
                    return styles.alertWarning;
                case 'success':
                    return styles.alertSuccess;
            }
        } else {
            switch (alert.color) {
                case 'error':
                    return styles.alertErrorStroke;
                case 'info':
                    return styles.alertInfoStroke;
                case 'warning':
                    return styles.alertWarningStroke;
                case 'success':
                    return styles.alertSuccessStroke;
            }
        }
    }

    return (
        <div
            className={clsx(
                styles.alert,
                getColorClassName(),
                isDeleting && styles.fadeOut
            )}
        >
            <span className={styles.alertText}>{alert.alert}</span>
            <button
                className={styles.alertButtonWithIcon}
                onClick={() => {
                    setIsDeleting(true);
                }}
                name='Close Alert'
            >
                <CloseIcon
                    className={clsx(
                        styles.alertButtonIcon,
                        getColorClassName(true)
                    )}
                />
            </button>
        </div>
    );
}
