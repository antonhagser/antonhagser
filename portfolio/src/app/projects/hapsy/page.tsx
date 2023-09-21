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

export default function ElectroSense() {
    const images: string[] = [];

    return (
        <>
            <Header />
            <Project className={commonStyles.container}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="Hapsy">
                    <ProjectHeaderButton
                        icon="Github"
                        url="https://github.com/antonhagser/auth"
                    />
                    <ProjectHeaderButton
                        value="Launch Demo"
                        url="/projects/hapsy/demo"
                    />
                </ProjectHeader>
                <TechStack>
                    <TechStackItem tech="Rust" />
                    <TechStackItem tech="TypeScript" />
                    <TechStackItem tech="Kubernetes" />
                    <TechStackItem tech="PostgreSQL" />
                    <TechStackItem tech="NodeJS" />
                    <TechStackItem tech="Go" />
                </TechStack>
                <ProjectDescription>
                    <h3>Advanced Authentication & Authorization System</h3>
                    <p>
                        Hapsy is designed with a focus on user security,
                        offering a comprehensive authentication and
                        authorization service for modern applications.
                        Emphasizing user data integrity and security, Hapsy
                        employs a blend of cutting-edge cryptographic algorithms
                        and scalable infrastructure.
                    </p>
                    <h4>Core Authentication Mechanisms</h4>
                    <p>
                        A blend of technologies, including Rust, TypeScript,
                        NodeJS, PostgreSQL, and Kubernetes, powers the system.
                        The Argon2id hashing algorithm is employed for robust
                        password security, ensuring that user credentials remain
                        protected. Additionally, the platform adopts the JWT
                        standard for token generation and verification, using
                        the RSA algorithm for enhanced token security.
                    </p>
                    <h4>Features and Scalability</h4>
                    <p>
                        The system boasts a diverse set of features,
                        encompassing user registration, email verification,
                        two-factor authentication, and rate limiting for API
                        endpoints. Designed with growth in mind, it stands ready
                        to handle expanding user bases without sacrificing
                        performance.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}
