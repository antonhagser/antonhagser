import clsx from 'clsx';
import styles from './demo.module.css';

interface Props {
    isExpanded?: boolean;

    className?: string;

    children?: React.ReactNode;
}

export default function ProjectDemo({ isExpanded, className, children }: Props) {
    return <div className={clsx(styles.demo, className, isExpanded && styles.expanded)}>{children}</div>;
}
