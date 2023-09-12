import Head from 'next/head';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Anton Hagsér',
    description: 'Full-stack developer with expertise in Rust, TypeScript, Go.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </Head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}
