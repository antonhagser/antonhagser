import Image from 'next/image';

import RustIcon from '@/app/icons/tech/rust';
import CppIcon from '@/app/icons/tech/cpp';
import GrafanaIcon from '@/app/icons/tech/grafana';
import KubernetesIcon from '@/app/icons/tech/kubernetes';
import InfluxIcon from '@/app/icons/tech/influxdb';
import TypeScriptIcon from '@/app/icons/tech/typescript';
import RaftIcon from '@/app/icons/tech/raft';

import styles from './tech.module.css';
import Link from 'next/link';
import NodeJSIcon from '@/app/icons/tech/nodejs';
import ReactIcon from '@/app/icons/tech/react';
import NextJSIcon from '@/app/icons/tech/nextjs';
import PostgreSQLIcon from '@/app/icons/tech/postgresql';
import GoIcon from '@/app/icons/tech/go';
import GitHubIcon from '@/app/icons/tech/github';
import ArgoCDIcon from '@/app/icons/tech/argocd';

export type Tech =
    | 'C++'
    | 'Grafana'
    | 'InfluxDB'
    | 'Kubernetes'
    | 'Rust'
    | 'TypeScript'
    | 'Raft'
    | 'NodeJS'
    | 'React'
    | 'NextJS'
    | 'PostgreSQL'
    | 'Go'
    | 'Github'
    | 'ArgoCD';

export interface Props {
    tech: Tech;
    className?: string;
}

export interface BrandColor {
    background: string;
    text: string;
    border: string;
}

export function getBrandIcon(
    tech: Tech,
    brandClassName?: string
): [JSX.Element, string] {
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
        case 'TypeScript':
            var icon = <TypeScriptIcon className={brandClassName} />;
            var url = 'https://www.typescriptlang.org/';

            return [icon, url];
        case 'Raft':
            var icon = <RaftIcon className={brandClassName} />;
            var url = 'https://raft.github.io/';

            return [icon, url];
        case 'NodeJS':
            var icon = <NodeJSIcon className={brandClassName} />;
            var url = 'https://nodejs.org/en/';

            return [icon, url];
        case 'React':
            var icon = <ReactIcon className={brandClassName} />;
            var url = 'https://reactjs.org/';

            return [icon, url];
        case 'NextJS':
            var icon = <NextJSIcon className={brandClassName} />;
            var url = 'https://nextjs.org/';

            return [icon, url];
        case 'PostgreSQL':
            var icon = <PostgreSQLIcon className={brandClassName} />;
            var url = 'https://www.postgresql.org/';

            return [icon, url];
        case 'Go':
            var icon = <GoIcon className={brandClassName} />;
            var url = 'https://golang.org/';

            return [icon, url];
        case 'Github':
            var icon = <GitHubIcon className={brandClassName} />;
            var url = 'https://github.com';

            return [icon, url];
        case 'ArgoCD':
            var icon = <ArgoCDIcon className={brandClassName} />;
            var url = 'https://argoproj.github.io/argo-cd/';

            return [icon, url];
        default:
            throw new Error('Invalid tech.');
    }
}

export default function TechStackItem({ tech, className }: Props) {
    const [icon, url] = getBrandIcon(tech, styles.techStackIcon);

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
