'use client';

import { useEffect, useState } from 'react';
import Alert from './alert.component';
import styles from './alertprovider.module.css';
import clsx from 'clsx';

export type AlertLevel = 'info' | 'warning' | 'error' | 'success' | 'fatal';

export interface Alert {
    id: string;
    className?: string;
    alert: string;
    color: AlertLevel;
}

export interface AlertProps {
    alert: Alert;

    onDelete: () => void;
}

interface Props {
    className?: string;
    knownAlerts?: Alert[];
}

export default function AlertProvider({ className, knownAlerts = [] }: Props) {
    const [alerts, setAlerts] = useState<Alert[]>(knownAlerts);

    useEffect(() => {
        setAlerts(knownAlerts);
    }, [knownAlerts]);

    function onDelete(key: string) {
        // Run some sort of animation on deletion
        setAlerts(alerts.filter((alert) => alert.id !== key));
    }

    return (
        <div className={clsx(styles.alertProvider, className)}>
            {alerts.map((alert, _) => (
                <Alert
                    key={alert.id}
                    alert={alert}
                    onDelete={() => onDelete(alert.id)}
                />
            ))}
        </div>
    );
}
