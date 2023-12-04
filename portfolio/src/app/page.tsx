import clsx from 'clsx';
import Link from 'next/link';

import styles from './page.module.css';
import commonStyles from './styles/common.module.css';

import solarIcon from '../../public/solar.png';
import authIcon from '../../public/auth.png';
import pulseDBIcon from '../../public/pulsedb.png';

import InlineProject from './components/project/inline.component';
import AlertProvider from './components/alert/alertprovider.component';

import Social from './components/social/social.component';
import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import ArrowRightIcon from './icons/arrow-right';

export default function Home() {
    return (
        <>
            <Header />
            <section
                className={clsx(
                    commonStyles.container,
                    styles.alertHolder,
                    styles.content
                )}
            >
                <AlertProvider knownAlerts={[]} />
            </section>
            <section
                className={clsx(
                    commonStyles.container,
                    styles.content,
                    styles.hello
                )}
            >
                <h2 className={styles.helloTitle}>
                    Hi, I&apos;m Anton Hagsér.
                    {/* Hej! 👋 */}
                </h2>
                <h3 className={styles.helloAboutMe}>
                    Full-stack developer with expertise in Rust, TypeScript, C#.
                    {/* Full-stack utvecklare med expertis inom Rust, TypeScript, Go. */}
                </h3>
            </section>
            <section className={clsx(commonStyles.container, styles.content)}>
                <div className={styles.projects}>
                    <h2 className={commonStyles.contentTitle}>Projects</h2>
                    <ul className={styles.projectsList}>
                        <InlineProject
                            title="ElectroSense"
                            description="Electricity monitoring system"
                            icon={solarIcon}
                            link="/projects/electro-sense"
                            isNew={true}
                        />
                        <InlineProject
                            title="Hapsy"
                            description="Efficient, secure, and user-friendly authentication"
                            icon={authIcon}
                            link="/projects/hapsy"
                        />
                        <InlineProject
                            title="PulseDB"
                            description="In memory database like redis"
                            icon={pulseDBIcon}
                            link="/projects/pulsedb"
                        />
                    </ul>
                    <div className={styles.projectsLink}>
                        <Link
                            href="/projects"
                            className={styles.projectsLinkInner}
                        >
                            <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            </section>
            <section className={clsx(commonStyles.container, styles.content)}>
                <div className={styles.socials}>
                    <h2 className={commonStyles.contentTitle}>Socials</h2>
                    <ul className={styles.socialsList}>
                        <Social
                            type="full"
                            brand="Email"
                            value="anton.hagser@epsidel.se"
                            url="mailto:anton.hagser@epsidel.se"
                        />
                        <Social
                            type="full"
                            brand="GitHub"
                            value="@antonhagser"
                            url="https://github.com/antonhagser"
                        />
                        <Social
                            type="full"
                            brand="LinkedIn"
                            value="@anton-hagser"
                            url="https://www.linkedin.com/in/anton-hagser/"
                        />
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}
