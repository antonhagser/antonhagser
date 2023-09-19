import { useState } from 'react';
import styles from './submit.module.css';

interface Props {
    value: string;
    isLoading?: boolean;
    className?: string;
}

export default function SubmitButton({ className, isLoading, value}: Props) {
    return (
        <button type="submit" className={styles.submit}>
            {isLoading ? <span className={styles.spinner}></span> : value}
        </button>
    );
}
