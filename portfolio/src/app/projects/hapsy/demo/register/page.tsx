'use client';

import AlertProvider, {
    Alert,
} from '@/app/components/alert/alertprovider.component';
import Footer from '@/app/components/footer/footer.component';
import Header from '@/app/components/header/header.component';
import clsx from 'clsx';

import commonStyles from '@/app/styles/common.module.css';
import styles from './page.module.css';
import { useState } from 'react';
import Label from '@/app/components/label/label.component';
import SubmitButton from '@/app/components/buttons/submit/submit.component';
import Link from 'next/link';
import signUp from './api';
import { SignUpResult } from './utils';
import { useRouter } from 'next/navigation';

export default function DemoSignup() {
    const router = useRouter();

    const [alerts, setAlerts] = useState<Alert[]>([]);

    // Form submit button
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        if (isLoading) {
            return;
        }

        // Prevent default form submission
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.currentTarget);

        setIsLoading(true);

        // Start the minimum spinner display time
        const minimumSpinnerTime = new Promise((resolve) =>
            setTimeout(resolve, 200)
        );

        // Wait for both the handleSubmitInner and the minimumSpinnerTime to complete
        await Promise.all([handleSubmitInner(formData), minimumSpinnerTime]);

        setIsLoading(false);
    }

    async function handleSubmitInner(formData: FormData) {
        // Check that all fields are filled in
        if (!formData.get('email') || !formData.get('password')) {
            setAlerts([
                {
                    id: 'missing-fields',
                    color: 'error',
                    alert: 'Please fill in all fields.',
                },
            ]);
            return;
        }

        // Get the form data
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Send the form
        const response = await signUp(email, password);

        switch (response) {
            case SignUpResult.Success:
                setAlerts([
                    {
                        id: 'success',
                        color: 'success',
                        alert: 'Account created successfully, redirecting...',
                    },
                ]);
                break;
            case SignUpResult.AlreadyExists:
                setAlerts([
                    {
                        id: 'email-already-exists',
                        color: 'error',
                        alert: 'An account with that email already exists.',
                    },
                ]);
                return;
            case SignUpResult.InvalidPassword:
                setAlerts([
                    {
                        id: 'invalid-password',
                        color: 'error',
                        alert: 'The password is not strong enough.',
                    },
                ]);
                return;
            default:
                setAlerts([
                    {
                        id: 'unknown-error',
                        color: 'error',
                        alert: 'An unknown error occurred.',
                    },
                ]);
                return;
        }

        // Redirect to the login page
        setTimeout(() => {
            router.push(
                '/projects/hapsy/demo/login?signup=success&email=' + email
            );
        }, 200);
    }

    return (
        <>
            <Header />
            <section
                className={clsx(commonStyles.container, styles.demoContainer)}
            >
                <div className={styles.demoTitle}>
                    <h2
                        className={clsx(
                            commonStyles.contentTitle,
                            styles.demoTitleInner
                        )}
                    >
                        Hapsy
                    </h2>
                    <Label type="gold" label="DEMO" />
                </div>
                <AlertProvider
                    className={commonStyles.container}
                    knownAlerts={alerts}
                />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <SubmitButton value="Signup" isLoading={isLoading} />
                    </div>
                    <div
                        className={clsx(styles.formGroup, styles.registerHere)}
                    >
                        <Link
                            href={'/projects/hapsy/demo/login'}
                            className={styles.registerHereInner}
                        >
                            Already a member? Log in here.
                        </Link>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    );
}
