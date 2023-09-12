'use client';

import { useState } from 'react';
import Alert from './alert.component';
import styles from './alertprovider.module.css';

export type AlertLevel = 'info' | 'warning' | 'error' | 'success';

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
    knownAlerts: Alert[];
}

export default function AlertProvider({ className, knownAlerts }: Props) {
    const [alerts, setAlerts] = useState<Alert[]>(knownAlerts);

    function onDelete(key: string) {
        // Run some sort of animation on deletion
        setAlerts(alerts.filter((alert) => alert.id !== key));

    }

    return (
        <div className={styles.alertProvider}>
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
