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

import portfolio1 from '../../../../public/portfolio-1.png';

export default function PulseDB() {
    const images = [portfolio1];

    return (
        <>
            <Header />
            <Project className={commonStyles.container}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="antonhagser.se">
                    <ProjectHeaderButton
                        icon="Github"
                        url="https://github.com/antonhagser/antonhagser"
                    />
                </ProjectHeader>
                <TechStack>
                    <TechStackItem tech="NodeJS" />
                    <TechStackItem tech="React" />
                    <TechStackItem tech="NextJS" />
                    <TechStackItem tech="Kubernetes" />
                </TechStack>
                <ProjectDescription>
                    <h3>Portfolio website</h3>
                    <p>
                        This website is built using React and NextJS. It is
                        hosted on a Kubernetes cluster running in K3S. The
                        website is designed to be fast and responsive. It is
                        also designed to be easily extendable and maintainable.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}
