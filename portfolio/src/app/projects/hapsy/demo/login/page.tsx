'use client';

import AlertProvider, {
    Alert,
} from '@/app/components/alert/alertprovider.component';
import Footer from '@/app/components/footer/footer.component';
import Header from '@/app/components/header/header.component';
import clsx from 'clsx';

import commonStyles from '@/app/styles/common.module.css';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Label from '../../../../components/label/label.component';
import SubmitButton from '@/app/components/buttons/submit/submit.component';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getPathnameWithoutQueryParams } from '@/app/components/referral/referral.component';
import { SignInResponse, SignInResult } from './utils';
import signIn from './api';

export default function DemoLogin() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (searchParams.has('signup') && searchParams.has('email')) {
            const signup = searchParams.get('signup') as string;
            const email = searchParams.get('email') as string;

            if (signup === 'success' && email !== '') {
                setAlerts([
                    {
                        id: 'signup-success',
                        color: 'success',
                        alert: `An email has been sent to ${email} to verify your account.`,
                    },
                ]);

                // Set email to the email that was signed up
                setEmail(email);
            }

            // Remove the query params from the URL.
            router.replace(getPathnameWithoutQueryParams(pathName));
        }
    }, [searchParams, router, pathName]);

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
        const response = await signIn(email, password);

        switch (response[0]) {
            case SignInResult.Success:
                setAlerts([
                    {
                        id: 'success',
                        color: 'success',
                        alert: 'Successfully signed in! The demo will reset on refresh.',
                    },
                ]);
                break;
            case SignInResult.Unauthorized:
                setAlerts([
                    {
                        id: 'unauthorized',
                        color: 'error',
                        alert: 'Incorrect email or password.',
                    },
                ]);
                return;
            case SignInResult.NeedFurtherVerificationThrough2FA:
                setAlerts([
                    {
                        id: 'need-2fa',
                        color: 'error',
                        alert: 'Account requires further verification through 2FA, which is not yet supported in this demo.',
                    },
                ]);
            default:
                setAlerts([
                    {
                        id: 'unknown-error',
                        color: 'error',
                        alert: 'Could not sign in, please try again.',
                    },
                ]);
                return;
        }
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
                <div>
                    <p></p>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <SubmitButton value="Login" isLoading={isLoading} />
                    </div>
                    <div
                        className={clsx(styles.formGroup, styles.registerHere)}
                    >
                        <Link
                            href={'/projects/hapsy/demo/register'}
                            className={styles.registerHereInner}
                        >
                            Don&apos;t have an account? Register here.
                        </Link>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    );
}
