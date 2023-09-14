import clsx from 'clsx';
import styles from './project.module.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function Project({ className, children }: Props) {
    return (
        <section className={clsx(className, styles.project)}>
            {children}
        </section>
    );
}
