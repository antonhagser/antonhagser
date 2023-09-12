import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';

import styles from './page.module.css';

export default function ElectroSense() {
    return (
        <>
            <Header />
            <section className={styles.project}>
                <h2>ElectroSense</h2>
            </section>
            <Footer />
        </>
    );
}
