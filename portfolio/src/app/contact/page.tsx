'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Header from '../components/header/header.component';
import Footer from '../components/footer/footer.component';

import styles from './page.module.css';
import commonStyles from '../styles/common.module.css';
import AlertProvider, {
    Alert,
} from '../components/alert/alertprovider.component';
import trySendContactForm from './content';
import { getCloudflareSiteKey } from './utils';
import Script from 'next/script';
import SubmitButton from '../components/buttons/submit/submit.component';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
    // Alerts
    const [alerts, setAlerts] = useState<Alert[]>([]);

    // Form fields
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [reason, setReason] = useState<string>('recruitment');
    const [message, setMessage] = useState<string>('');

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

        window.scrollTo(0, 0);
    }

    async function handleSubmitInner(formData: FormData) {
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
                    alert: 'All fields must be filled in.',
                    color: 'error',
                },
            ]);

            return;
        }

        // Cloudflare
        const cf = formData.get('cf-turnstile-response') as string;

        // If the email is invalid, show error message
        if (!email || !email.includes('@')) {
            setAlerts([
                {
                    id: '1',
                    alert: 'Invalid email address provided.',
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
                    alert: 'Please include a message.',
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
                    alert: 'Message sent successfully!',
                    color: 'success',
                },
            ]);

            // Clear the form
            setName('');
            setEmail('');
            setReason('recruitment');
            setMessage('');
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
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={styles.textArea}
                        ></textarea>
                    </div>
                    <div className={styles.cloudflare}>
                        <Turnstile siteKey={getCloudflareSiteKey()} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <SubmitButton value="Send" isLoading={isLoading} />
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
