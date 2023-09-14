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
            <Project className={commonStyles.headerContainer}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="Hapsy">
                    <ProjectHeaderButton
                        icon="Github"
                        url="https://github.com/antonhagser/auth"
                    />
                    <ProjectHeaderButton
                        value="Launch Demo"
                        url="/demo/hapsy/login"
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
                    <h3>Secure authentication and authorization service</h3>
                    <p>
                        Hapsy is a secure authentication and authorization
                        service powered by latest cryptographic algorithms. It
                        is built using Rust, TypeScript, NodeJS, PostgreSQL and
                        Kubernetes. It is designed to be horizontally scalable
                        and fault tolerant.
                    </p>
                    <h4>Authentication</h4>
                    <p>
                        Hapsy uses the latest cryptographic algorithms to ensure
                        the security of user data. It uses the Argon2id hashing
                        algorithm to hash user passwords. It uses the JWT
                        standard to generate and verify tokens. It uses the RSA
                        algorithm to sign and verify tokens.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}
