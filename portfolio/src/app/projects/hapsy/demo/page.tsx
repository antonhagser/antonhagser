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
import Label from '../../../components/label/label.component';
import SubmitButton from '@/app/components/buttons/submit/submit.component';
import Link from 'next/link';

export default function DemoLogin() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    return (
        <>
            <Header />
            <AlertProvider
                className={commonStyles.container}
                knownAlerts={alerts}
            />
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
                <form className={styles.form}>
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
                        <SubmitButton value="Login " />
                    </div>
                    <div className={clsx(styles.formGroup, styles.registerHere)}>
                        <Link
                            href={'/projects/hapsy/demo/signup'}
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
