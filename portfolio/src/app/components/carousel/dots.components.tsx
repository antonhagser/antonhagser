import clsx from 'clsx';
import styles from './dots.module.css';

type Props = {
    itemsLength: number;
    selectedIndex: number;
    onClick: (id: number) => void;
};

const Dots = ({ itemsLength, selectedIndex, onClick }: Props) => {
    const arr = new Array(itemsLength).fill(0);
    return (
        <div className={styles.dots}>
            {arr.map((_, index) => {
                const selected = index === selectedIndex;
                return (
                    <div
                        className={clsx(
                            styles.dot,
                            selected && styles.dotSelected
                        )}
                        onClick={() => onClick(index)}
                        key={index}
                    ></div>
                );
            })}
        </div>
    );
};
export default Dots;
