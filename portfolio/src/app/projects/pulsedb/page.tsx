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

import pulsedb1 from '../../../../public/pulsedb-1.png';
import pulsedb2 from '../../../../public/pulsedb-2.png';
import pulsedb3 from '../../../../public/pulsedb-3.png';
import pulsedb4 from '../../../../public/pulsedb-4.png';
import pulsedb5 from '../../../../public/pulsedb-5.png';
import pulsedb6 from '../../../../public/pulsedb-6.png';
import pulsedb7 from '../../../../public/pulsedb-7.png';
import pulsedb8 from '../../../../public/pulsedb-8.png';
import pulsedb9 from '../../../../public/pulsedb-9.png';
import pulsedb10 from '../../../../public/pulsedb-10.png';

export default function PulseDB() {
    const images = [
        pulsedb1,
        pulsedb2,
        pulsedb3,
        pulsedb4,
        pulsedb5,
        pulsedb6,
        pulsedb7,
        pulsedb8,
        pulsedb9,
        pulsedb10,
    ];

    return (
        <>
            <Header />
            <Project className={commonStyles.container}>
                <ProjectCarousel images={images} />
                <ProjectHeader title="PulseDB"></ProjectHeader>
                <TechStack>
                    <TechStackItem tech="Rust" />
                    <TechStackItem tech="Kubernetes" />
                    <TechStackItem tech="Raft" />
                    <TechStackItem tech="ArgoCD" />
                </TechStack>
                <ProjectDescription>
                    <h3>Redis inspired distributed in-memory database</h3>
                    <p>
                        PulseDB is a distributed in-memory database that
                        supports the Redis protocol. It is built using Rust and
                        Kubernetes. It uses the Raft consensus algorithm to
                        ensure data consistency across the cluster. PulseDB is
                        designed to be horizontally scalable and fault tolerant.
                    </p>
                    <h4>Performance & Reliability</h4>
                    <p>
                        At its core, PulseDB is engineered with performance and
                        reliability in mind. The choice of Rust as the primary
                        development language ensures memory safety, concurrency,
                        and high-speed execution. This, coupled with Kubernetes,
                        empowers PulseDB to dynamically manage its resources,
                        scale on demand, and provide a resilient environment
                        against failures.
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
                    <h4>Consistency</h4>
                    <p>
                        One of the standout features of PulseDB is its
                        commitment to data consistency. In distributed systems,
                        ensuring that every node has the same data is a
                        challenge. PulseDB rises to this challenge by
                        implementing the Raft consensus algorithm.
                    </p>
                </ProjectDescription>
            </Project>
            <Footer />
        </>
    );
}
