import Image from 'next/image';
import clsx from 'clsx';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';

import commonStyles from '../../styles/common.module.css';
import styles from './page.module.css';

import Carousel from '@/app/components/carousel/carousel.component';

import electroSense1 from '../../../../public/electro-sense-1.png';
import electroSense2 from '../../../../public/electro-sense-2.png';
import electroSense3 from '../../../../public/electro-sense-3.png';
import Link from 'next/link';
import ProjectCarousel from '../../components/project/carousel/carousel.component';
import ProjectHeader from '../../components/project/header/header.component';
import ProjectDescription from '@/app/components/project/description/description.component';

export default function ElectroSense() {
    const images = [electroSense1, electroSense2, electroSense3];

    return (
        <>
            <Header />
            <section
                className={clsx(commonStyles.headerContainer, styles.project)}
            >
                <ProjectCarousel images={images} />
                <ProjectHeader title="ElectroSense" hasDemo={true} />
                <ProjectDescription>
                    <h3>Electricity Production & Usage Monitoring System</h3>
                    <p>
                        ElectroSense is a tool designed to provide real-time
                        insights into electricity production and consumption. As
                        the global energy landscape shifts towards decentralized
                        and renewable sources, understanding self-production
                        becomes crucial. Monitoring self-produced energy not
                        only optimizes individual consumption but also aids in
                        stabilizing the grid, preventing overloads, and ensuring
                        efficient energy distribution.
                    </p>
                    <h4>Core Components and Data Aggregation</h4>
                    <p>
                        At the system&apos;s core is an ESP-12F microcontroller,
                        programmed in C++ to capture data using the DSMR 5.0.2
                        protocol. This data is transmitted via TCP to a primary
                        monitoring service, developed in Rust, running within a{' '}
                        <a
                            href="https://kubernetes.io"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kubernetes
                        </a>{' '}
                        cluster. This Rust service further aggregates
                        electricity data from a SolarEdge inverter using the
                        Modbus connection, compliant with the SunSpec protocol.
                    </p>
                    <h4>Data Processing and Visualization</h4>
                    <p>
                        Once aggregated, the data undergoes processing to derive
                        essential metrics, such as consumption. It is then
                        stored in{' '}
                        <a
                            href="https://influxdb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            InfluxDB
                        </a>
                        . A{' '}
                        <a
                            href="https://grafana.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Grafana
                        </a>{' '}
                        service, deployed within the Kubernetes environment,
                        reads these measurements, presenting them in a real-time
                        visualization dashboard. This dashboard offers a clear
                        and intuitive representation of electricity metrics,
                        bridging the gap between raw data and actionable
                        insights.
                    </p>
                    <p>
                        In essence, this system is more than just a monitoring
                        tool; it&apos;s a step towards a more sustainable and
                        efficient energy future, where self-production plays a
                        central role in grid stability and optimization.
                    </p>
                </ProjectDescription>
            </section>
            <Footer />
        </>
    );
}
