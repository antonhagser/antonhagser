import styles from './description.module.css';

interface Props {
    children: React.ReactNode;
}

export default function ProjectDescription({ children }: Props) {
    return <div className={styles.projectDescription}>{children}</div>;
}
