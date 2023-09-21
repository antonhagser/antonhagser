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

export default function PulseDB() {
    const images: string[] = [];

    return (
        <>
            <Header />
            <Project className={commonStyles.container}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="PulseDB">
                    <ProjectHeaderButton
                        icon="Github"
                        url="https://github.com/antonhagser/pulsedb"
                    />
                    <ProjectHeaderButton value="Launch Demo" />
                </ProjectHeader>
                <TechStack>
                    <TechStackItem tech="Rust" />
                    <TechStackItem tech="Kubernetes" />
                    <TechStackItem tech="Raft" />
                    <TechStackItem tech="ArgoCD" />
                </TechStack>
                <ProjectDescription>
                    <h3>Redis like distributed in-memory database</h3>
                    <p>
                        PulseDB is a distributed in-memory database that
                        supports the Redis protocol. It is built using Rust and
                        Kubernetes. It uses the Raft consensus algorithm to
                        ensure data consistency across the cluster. PulseDB is
                        designed to be horizontally scalable and fault tolerant.
                    </p>
                    <h4>Raft Consensus Algorithm</h4>
                    <p>
                        Raft is a consensus algorithm designed to be easy to
                        understand. It&apos;s equivalent to Paxos in
                        fault-tolerance and performance. The difference is that
                        it&apos;s decomposed into relatively independent
                        subproblems, and it cleanly addresses all major pieces
                        needed for practical systems.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}
