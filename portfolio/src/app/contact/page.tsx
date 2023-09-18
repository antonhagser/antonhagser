'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import Header from '../components/header/header.component';
import Footer from '../components/footer/footer.component';

import styles from './page.module.css';
import commonStyles from '../styles/common.module.css';
import AlertProvider, {
    Alert,
} from '../components/alert/alertprovider.component';
import Script from 'next/script';
import trySendContactForm from './content';

type RenderParameters = {
    sitekey: string;
    theme?: 'light' | 'dark';
    callback?(token: string): void;
};

declare global {
    interface Window {
        onloadTurnstileCallback(): void;
        turnstile: {
            render(
                container: string | HTMLElement,
                params: RenderParameters
            ): void;
        };
    }
}

export default function Contact() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    async function handleSubmit(formData: FormData) {
        // Check that all fields are filled in
        if (
            !formData.get('name') ||
            !formData.get('email') ||
            !formData.get('reason') ||
            !formData.get('message')
        ) {
            setAlerts([
                {
                    id: '1',
                    alert: 'All fields must be filled in',
                    color: 'error',
                },
            ]);

            return;
        }

        const data = formData.keys();

        for (const key of data) {
            console.log(key);
        }

        // Get the form data
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const reason = formData.get('reason')?.toString() ?? 'unknown';
        const message = formData.get('message')?.toString();

        // Cloudflare
        const cf = formData.get('cf-turnstile-response') as string;

        // If the email is invalid, show error message
        if (!email || !email.includes('@')) {
            setAlerts([
                {
                    id: '1',
                    alert: 'Invalid email address provided',
                    color: 'error',
                },
            ]);

            return;
        }

        // If the message is empty, show error message
        if (!message) {
            setAlerts([
                {
                    id: '1',
                    alert: 'Please include a message',
                    color: 'error',
                },
            ]);
            return;
        }

        // Compute the message
        let computedMessage = `Name: ${name}\nEmail: ${email}\nReason: ${reason}\nMessage:\n\n${message}`;

        // Send the message
        if (
            await trySendContactForm(cf, { reason, message: computedMessage })
        ) {
            setAlerts([
                {
                    id: '1',
                    alert: 'Message sent successfully',
                    color: 'success',
                },
            ]);
        } else {
            setAlerts([
                {
                    id: '1',
                    alert: 'Failed to send message, contact me at hi@antonhagser.se',
                    color: 'error',
                },
            ]);
        }
    }

    const [cloudflareSiteKey, setCloudflareSiteKey] = useState('');

    useEffect(() => {
        async function fetchConfig() {
            const response = await fetch('/api/cloudflare');
            const data = await response.json();
            setCloudflareSiteKey(data.cloudflareSiteKey);
        }

        fetchConfig();
    }, []);

    return (
        <>
            <Header />
            <AlertProvider
                className={commonStyles.headerContainer}
                knownAlerts={alerts}
            />
            <section
                className={clsx(
                    commonStyles.headerContainer,
                    styles.contactForm
                )}
            >
                <h2 className={clsx(commonStyles.contentTitle)}>
                    Get in Touch
                </h2>
                <p className={clsx(commonStyles.contentText)}>
                    I&apos;d love to hear from you! Whether you&apos;re looking
                    to collaborate, have a question, or just want to say hello,
                    drop me a message.
                </p>
                <Script id="cf-turnstile-callback">
                    {`window.onloadTurnstileCallback = function () {
                      window.turnstile.render('#cloudflare-widget', {
                        sitekey: '${cloudflareSiteKey}',
                      })
                    }`}
                </Script>
                <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
                    async={true}
                    defer={true}
                />
                <form action={handleSubmit} className={styles.form}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="reason" className={styles.label}>
                            Reason for Contacting
                        </label>
                        <select
                            name="reason"
                            id="reason"
                            className={clsx(styles.input, styles.select)}
                        >
                            <option value="recruitment">Recruitment</option>
                            <option value="freelancing">Freelancing</option>
                            <option value="general">General Inquiry</option>
                            <option value="feedback">Feedback</option>
                        </select>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="message" className={styles.label}>
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            cols={30}
                            rows={10}
                            className={styles.textArea}
                        ></textarea>
                    </div>
                    <div id="cloudflare-widget" className="checkbox" />
                    <div className={clsx(styles.formGroup)}>
                        <button type="submit" className={styles.submit}>
                            Send
                        </button>
                    </div>
                </form>
                <div className={styles.contactInfo}>
                    <h3>Contact Information</h3>
                    <p>
                        Email:{' '}
                        <a href="mailto:info@example.com">
                            anton.hagser@epsidel.se
                        </a>
                    </p>
                    <p>Address: Gothenburg, Sweden</p>
                </div>
            </section>
            <Footer />
        </>
    );
}
