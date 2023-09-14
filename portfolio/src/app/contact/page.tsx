import clsx from 'clsx';
import Link from 'next/link';

import Header from '../components/header/header.component';
import Footer from '../components/footer/footer.component';

import styles from './page.module.css';
import commonStyles from '../styles/common.module.css';
import AlertProvider from '../components/alert/alertprovider.component';

export default function Contact() {
    async function handleSubmit(formData: FormData) {
        'use server';
        console.log(formData);
    }

    return (
        <>
            <Header />
            <AlertProvider className={commonStyles.headerContainer}
                knownAlerts={[
                    {
                        id: '1',
                        alert: 'Contact form not yet implemented please contact me at: anton.hagser@epsidel.se',
                        color: 'error',
                    },
                ]}
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
                <form action={handleSubmit} className={styles.form}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input type="text" id="name" className={styles.input} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="reason" className={styles.label}>
                            Reason for Contacting
                        </label>
                        <select
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
