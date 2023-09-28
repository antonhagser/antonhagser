'use client';

import Footer from '@/app/components/footer/footer.component';
import Header from '@/app/components/header/header.component';
import clsx from 'clsx';

import commonStyles from '@/app/styles/common.module.css';

export default function DemoVerify() {
    return (
        <>
            <Header />
            <section className={clsx(commonStyles.container)}>Success!</section>
            <Footer />
        </>
    );
}
