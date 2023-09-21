'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';

import commonStyles from '../../styles/common.module.css';
import styles from './page.module.css';

import ProjectCarousel from '../../components/project/carousel/carousel.component';
import ProjectHeader from '../../components/project/header/header.component';
import ProjectDescription from '@/app/components/project/description/description.component';

import TechStackItem from '../../components/project/tech/tech.component';
import TechStack from '@/app/components/project/techstack/stack.component';
import Project from '@/app/components/project/project.component';
import ProjectHeaderButton from '@/app/components/project/header/button.component';
import ProjectDemo from '@/app/components/project/demo/demo.component';

import shorty1 from '../../../../public/shorty-1.png';
import shortenURL, { deleteURL } from './shorten';
import AlertProvider, {
    Alert,
} from '@/app/components/alert/alertprovider.component';
import Link from 'next/link';
import CopyIcon from '../../icons/copy';
import TrashIcon from '@/app/icons/trash';
import CheckIcon from '@/app/icons/check';
import SubmitButton from '@/app/components/buttons/submit/submit.component';

export default function ElectroSense() {
    const images = [shorty1];

    const [isDemoExpanded, setIsDemoExpanded] = useState(false);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    function getShortenedURLs(): Map<string, [Date, string]> {
        if (typeof window === 'undefined') {
            return new Map();
        }

        // Get urls from localstorage
        var urls = localStorage.getItem('shortenedURLs');
        if (!urls) {
            return new Map();
        }

        // Parse to map
        const parsedUrls: Array<[string, [Date, string]]> = JSON.parse(urls);

        // Convert dates
        parsedUrls.forEach((url) => {
            url[1][0] = new Date(url[1][0]);
        });

        return new Map(parsedUrls);
    }

    const [shortenedURLs, setShortenedURLs] = useState<
        Map<string, [Date, string]>
    >(new Map());

    useEffect(() => {
        setShortenedURLs(getShortenedURLs());
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    async function formSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        await Promise.all([formSubmitInner(formData), minimumSpinnerTime]);

        setIsLoading(false);
    }

    async function formSubmitInner(formData: FormData) {
        if (typeof window === 'undefined') {
            return new Map();
        }

        let url = formData.has('url') ? formData.get('url') : '';
        if (!url || url.length === 0 || url === '') {
            setAlerts([
                {
                    id: '1',
                    color: 'error',
                    alert: 'Please enter a URL to shorten.',
                },
            ]);

            return;
        }

        // Shorten URL
        let shortURL = await shortenURL(formData.get('url') as string);
        if (shortURL) {
            setAlerts([
                {
                    id: '1',
                    color: 'success',
                    alert: 'Successfully shortened URL.',
                },
            ]);

            // Reset form
            let form = document.querySelector('form');
            if (form) {
                form.reset();
            }

            // Parse response
            let id = shortURL[0];
            let url = shortURL[1];

            // Add to localstorage and state
            let urls = getShortenedURLs();
            urls.set(id, [new Date(), url]);

            localStorage.setItem(
                'shortenedURLs',
                JSON.stringify(Array.from(urls.entries()))
            );
            setShortenedURLs(urls);
        } else {
            setAlerts([
                {
                    id: '1',
                    color: 'fatal',
                    alert: 'Internal server error.',
                },
            ]);
        }
    }

    async function deletionHandler(key: string) {
        if (typeof window === 'undefined') {
            return new Map();
        }

        // Remove from db
        let result = await deleteURL(key);
        if (!result) {
            setAlerts([
                {
                    id: '1',
                    color: 'fatal',
                    alert: 'Failed to delete URL due to an internal error.',
                },
            ]);

            return;
        }

        // remove from localstorage and state
        let urls = getShortenedURLs();
        urls.delete(key);

        localStorage.setItem(
            'shortenedURLs',
            JSON.stringify(Array.from(urls.entries()))
        );
        setShortenedURLs(urls);

        setAlerts([
            {
                id: '1',
                color: 'success',
                alert: 'Successfully deleted URL.',
            },
        ]);
    }

    return (
        <>
            <Header />
            <AlertProvider
                className={commonStyles.container}
                knownAlerts={alerts}
            />
            <Project className={commonStyles.container}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="Shorty">
                    <ProjectHeaderButton
                        icon="Github"
                        url="https://github.com/antonhagser/shorty"
                    />
                    <ProjectHeaderButton
                        value={isDemoExpanded ? 'Close demo' : 'Open demo'}
                        onClick={() => {
                            setIsDemoExpanded(!isDemoExpanded);
                        }}
                    />
                </ProjectHeader>
                <ProjectDemo
                    className={styles.expandedDemo}
                    isExpanded={isDemoExpanded}
                >
                    <form onSubmit={formSubmit}>
                        <div className={styles.expandedDemoFormGroup}>
                            <input
                                name="url"
                                type="text"
                                className={styles.expandedDemoInput}
                                placeholder="https://example.com"
                            />

                            <SubmitButton
                                value="Shorten"
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                    {shortenedURLs.size > 0 && (
                        <ul className={styles.shortenedURLs}>
                            {
                                // Render shortened urls (sorted by creationDate)
                                Array.from(shortenedURLs)
                                    .sort((a, b) => {
                                        console.log(a, b);
                                        return (
                                            a[1][0].getTime() -
                                            b[1][0].getTime()
                                        );
                                    })
                                    .map((url) => {
                                        return (
                                            <ShortURL
                                                key={url[0]}
                                                id={url[0]}
                                                url={url[1][1]}
                                                deletionHandler={
                                                    deletionHandler
                                                }
                                            />
                                        );
                                    })
                            }
                        </ul>
                    )}
                </ProjectDemo>
                <TechStack>
                    <TechStackItem tech="TypeScript" />
                    <TechStackItem tech="Kubernetes" />
                    <TechStackItem tech="PostgreSQL" />
                </TechStack>
                <ProjectDescription>
                    <h3>Dead simple URL shortener</h3>
                    <p>
                        Shorty is a dead simple URL shortener built using
                        TypeScript and Kubernetes. It uses PostgreSQL as a
                        database and is designed to be horizontally scalable
                        where PostgreSQL is running in a clustered environment
                        such as CockroachDB.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}

interface ShortURLProps {
    id: string;
    url: string;
    deletionHandler: (id: string) => void;
}

function ShortURL({ id, url, deletionHandler }: ShortURLProps) {
    const [deletionState, setDeletionState] = useState<'idle' | 'deleting'>(
        'idle'
    );

    return (
        <li className={styles.shortURL}>
            <Link href={url}>{url}</Link>

            <div className={styles.shortURLButtonHolder}>
                <button
                    className={styles.shortURLButton}
                    onClick={() => {
                        navigator.clipboard.writeText(url);
                    }}
                >
                    <CopyIcon className={styles.shortURLButtonIcon} />
                </button>
                <button
                    className={clsx(
                        styles.shortURLButton,
                        styles.shortURLButtonDelete
                    )}
                    onClick={() => {
                        if (deletionState === 'deleting') {
                            deletionHandler(id);

                            return;
                        } else {
                            setDeletionState('deleting');
                        }
                    }}
                >
                    {(deletionState === 'idle' && (
                        <TrashIcon className={styles.shortURLButtonIcon} />
                    )) || <CheckIcon className={styles.shortURLButtonIcon} />}
                </button>
            </div>
        </li>
    );
}
