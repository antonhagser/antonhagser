import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';

import styles from './page.module.css';
import commonStyles from '../styles/common.module.css';
import InlineProject from '../components/project/inline.component';

import solarIcon from '../../../public/solar.png';
import cdnIcon from '../../../public/cdn.png';
import urlIcon from '../../../public/url.png';
import authIcon from '../../../public/auth.png';
import pulseDBIcon from '../../../public/pulsedb.png';
import portfolioIcon from '../../../public/portfolio.png';
import AlertProvider from '../components/alert/alertprovider.component';

export default function Projects() {
    return (
        <>
            <Header />
            <AlertProvider className={commonStyles.container} />
            <section className={commonStyles.container}>
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
                        description="In memory database inspired by redis"
                        icon={pulseDBIcon}
                        link="/projects/pulsedb"
                    />
                    <InlineProject
                        title="Shorty"
                        description="A dead simple URL shortener"
                        icon={urlIcon}
                        link="/projects/shorty"
                        hasDemo={true}
                    />
                    <InlineProject
                        title="antonhagser.se"
                        description="My personal website"
                        icon={portfolioIcon}
                        link="/projects/antonhagser"
                    />
                </ul>
            </section>
            <Footer />
        </>
    );
}
