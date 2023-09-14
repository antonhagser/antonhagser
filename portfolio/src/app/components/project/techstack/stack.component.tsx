import clsx from 'clsx';
import styles from './stack.module.css';

interface Props {
    className?: string;

    children?: React.ReactNode;
}

export default function TechStack({ className, children }: Props) {
    return (
        <div className={clsx(styles.techStackContainer, className)}>
            <h3 className={styles.techStackTitle}>Technologies Used</h3>
            <ul className={styles.techStackItems}>{children}</ul>
        </div>
    );
}
