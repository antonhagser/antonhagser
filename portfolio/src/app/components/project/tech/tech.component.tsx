import Image from 'next/image';

import RustIcon from '@/app/icons/tech/rust';
import CppIcon from '@/app/icons/tech/cpp';
import GrafanaIcon from '@/app/icons/tech/grafana';
import KubernetesIcon from '@/app/icons/tech/kubernetes';
import InfluxIcon from '@/app/icons/tech/influxdb';
import styles from './tech.module.css';
import Link from 'next/link';

export type Tech = 'C++' | 'Grafana' | 'InfluxDB' | 'Kubernetes' | 'Rust';

export interface Props {
    tech: Tech;
    className?: string;
}

export interface BrandColor {
    background: string;
    text: string;
    border: string;
}

export default function TechStackItem({ tech, className }: Props) {
    function getBrandIcon(brandClassName?: string): [JSX.Element, string] {
        switch (tech) {
            case 'C++':
                var icon = <CppIcon className={brandClassName} />;
                var url = 'https://isocpp.org/';

                return [icon, url];
            case 'Grafana':
                var icon = <GrafanaIcon className={brandClassName} />;
                var url = 'https://grafana.com/';

                return [icon, url];
            case 'InfluxDB':
                var icon = <InfluxIcon className={brandClassName} />;
                var url = 'https://www.influxdata.com/';

                return [icon, url];
            case 'Kubernetes':
                var icon = <KubernetesIcon className={brandClassName} />;
                var url = 'https://kubernetes.io/';

                return [icon, url];
            case 'Rust':
                var icon = <RustIcon className={brandClassName} />;
                var url = 'https://www.rust-lang.org/';

                return [icon, url];
        }
    }

    const [icon, url] = getBrandIcon(styles.techStackIcon);

    return (
        <li>
            <Link
                href={url}
                className={styles.techStackItem}
                target="blank"
                rel="noopener noreferrer"
            >
                <div className={styles.techStackItemInner}>
                    {icon}
                    <p>{tech}</p>
                </div>
            </Link>
        </li>
    );
}
