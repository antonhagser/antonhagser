import clsx from 'clsx';
import styles from './label.module.css';

type LabelType = 'normal' | 'gold';

interface Props {
    type: LabelType;
    label: string;
    hoverAble?: boolean;
    className?: string;
}

export default function Label({
    type = 'normal',
    label,
    hoverAble = true,
    className,
}: Props) {
    return (
        <div
            className={clsx(
                styles.label,
                type === 'gold' && styles.labelGold,
                hoverAble && styles.hoverAble,
                className
            )}
        >
            <span
                className={clsx(
                    styles.labelInner,
                    hoverAble && styles.hoverAble
                )}
            >
                {label}
            </span>
        </div>
    );
}
