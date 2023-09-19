import Image from 'next/image';

import Carousel from '../../carousel/carousel.component';

import styles from './carousel.module.css';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Props {
    images: (string | StaticImport)[];
}

export default function ProjectCarousel({ images }: Props) {
    return (
        <>
            {images.length > 0 && (
                <div className={styles.carousel}>
                    <Carousel
                        loop
                        className={styles.carouselInner}
                        duration={50}
                    >
                        {images.map((src, i) => {
                            return (
                                <div className={styles.carouselSlide} key={i}>
                                    <Image
                                        src={src}
                                        width={4536}
                                        height={3062}
                                        className={styles.carouselImage}
                                        alt="alt"
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            )}
        </>
    );
}
