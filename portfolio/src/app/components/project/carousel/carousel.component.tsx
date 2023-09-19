import Image from 'next/image';

import Carousel from '../../carousel/carousel.component';

import styles from './carousel.module.css';
import {
    StaticImageData,
    StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import sharp from 'sharp';

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
                                        width={1920}
                                        height={1296}
                                        className={styles.carouselImage}
                                        placeholder="blur"
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
