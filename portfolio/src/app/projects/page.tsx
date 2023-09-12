import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';

import styles from './page.module.css';
import commonStyles from '../styles/common.module.css';
import Project from '../components/project/project.component';

import solarIcon from '../../../public/solar.png';
import cdnIcon from '../../../public/cdn.png';
import authIcon from '../../../public/auth.png';

export default function Projects() {
    return (
        <>
            <Header />
            <section className={commonStyles.headerContainer}>
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
            </section>
            <Footer />
        </>
    );
}
