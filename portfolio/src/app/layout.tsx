import Script from 'next/script';
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
            <body>
                <Script
                    async
                    defer
                    src="https://antonhagser.se/locale/script.js"
                    data-website-id="17c5d446-b3e2-48f8-a81a-504301bad0e5"
                    data-host-url="https://umami.antonhagser.se"
                ></Script>
                <main>{children}</main>
            </body>
        </html>
    );
}
