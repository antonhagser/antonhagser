import clsx from 'clsx';
import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';

import commonStyles from '../styles/common.module.css';
import styles from './page.module.css';

export default function About() {
    return (
        <>
            <Header />
            <section className={commonStyles.container}>
                <h2 className={clsx(commonStyles.contentTitle)}>About Me</h2>
                <p className={clsx(commonStyles.contentText, styles.paragraph)}>
                    Full-Stack Developer with expertise in a wide array of
                    languages and frameworks, including Rust, TypeScript, Go,
                    and more. I&apos;ve worked with cutting-edge technologies
                    like Kubernetes, Docker, and cloud platforms, and have
                    hands-on experience in system administration, particularly
                    during the transition of Gothenburg City from Windows 7 to
                    Windows 10.
                </p>
                <p className={clsx(commonStyles.contentText, styles.paragraph)}>
                    I&apos;m particularly proud of my personal projects. One of
                    which is a robust home infrastructure deployment using
                    Kubernetes, where I established a cluster, managed ingress
                    traffic, and ensured zero downtime deployments. Another is a
                    real-time electricity production & usage monitoring system,
                    where I developed custom firmware and aggregated data for
                    intuitive visualization.
                </p>
                <p className={clsx(commonStyles.contentText, styles.paragraph)}>
                    Driven by innovation and a passion for leveraging technology
                    to address real-world challenges, I&apos;m always on the
                    lookout for new learning opportunities and collaborations.
                </p>
            </section>
            <Footer />
        </>
    );
}
