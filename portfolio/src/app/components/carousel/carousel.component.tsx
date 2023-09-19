'use client';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import React from 'react';
import { PropsWithChildren, useEffect, useState } from 'react';
// import CarouselControls from './CarouselControls';
// import Dots from './Dots';

import styles from './carousel.module.css';
import clsx from 'clsx';
import Dots from './dots.components';
import Autoplay from 'embla-carousel-autoplay';

// Define the props
interface CarouselProps {
    className?: string;
}

type Props = CarouselProps & PropsWithChildren & EmblaOptionsType;

const Carousel = ({ className, children, ...options }: Props) => {
    const autoplayOptions = {
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay(autoplayOptions),
    ]);
    const [isStopped, setIsStopped] = useState(false);

    // need to selectedIndex to allow this component to re-render in react.
    // Since emblaRef is a ref, it won't re-render even if there are internal changes to its state.
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        function selectHandler() {
            const index = emblaApi?.selectedScrollSnap();
            setSelectedIndex(index || 0);
        }

        emblaApi?.on('select', selectHandler);
        // cleanup
        return () => {
            emblaApi?.off('select', selectHandler);
        };
    }, [emblaApi]);

    const length = React.Children.count(children);
    const canScrollNext = !!emblaApi?.canScrollNext();
    const canScrollPrev = !!emblaApi?.canScrollPrev();
    return (
        <>
            <div className={clsx(styles.holder, className)} ref={emblaRef}>
                <div className={styles.flex}>{children}</div>
            </div>
            <Dots
                itemsLength={length}
                selectedIndex={selectedIndex}
                onClick={(id) => emblaApi?.scrollTo(id, true)}
            />
        </>
    );
};
export default Carousel;
