import styles from './page.module.css';
import commonStyles from './styles/common.module.css';
import clsx from 'clsx';

import solarIcon from '../../public/solar.png';
import cdnIcon from '../../public/cdn.png';
import authIcon from '../../public/auth.png';

import Project from './components/project/project.component';
import AlertProvider, {
    Alert,
} from './components/alert/alertprovider.component';
import Social from './components/social/social.component';
import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import ArrowRightIcon from './icons/arrow-right-icon';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Header />
            <section
                className={clsx(
                    commonStyles.headerContainer,
                    styles.alertHolder,
                    styles.content
                )}
            >
                <AlertProvider
                    knownAlerts={[
                        {
                            id: '1',
                            alert: 'This website is under construction.',
                            color: 'warning',
                        },
                    ]}
                />
            </section>
            <section
                className={clsx(
                    commonStyles.headerContainer,
                    styles.content,
                    styles.hello
                )}
            >
                <h2 className={styles.helloTitle}>
                    Hi, I&apos;m Anton Hagsér.
                </h2>
                <h3 className={styles.helloAboutMe}>
                    Full-stack developer with expertise in Rust, TypeScript, Go.
                </h3>
            </section>
            <section
                className={clsx(commonStyles.headerContainer, styles.content)}
            >
                <div className={styles.projects}>
                    <h2 className={commonStyles.contentTitle}>Projects</h2>
                    <ul className={styles.projectsList}>
                        <Project
                            title="ElectroSense"
                            description="Electricity monitoring system"
                            icon={solarIcon}
                            link="/projects/electro-sense"
                            isNew={true}
                        />
                        <Project
                            title="Hapsy"
                            description="Efficient, secure, and user-friendly authentication"
                            icon={authIcon}
                            link="/projects/hapsy"
                            isNew={false}
                        />
                        <Project
                            title="Concrete"
                            description="Globally accessible content delivery system"
                            icon={cdnIcon}
                            link="/projects/concrete"
                            isNew={false}
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
            <section
                className={clsx(commonStyles.headerContainer, styles.content)}
            >
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
