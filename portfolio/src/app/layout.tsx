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
                <main>{children}</main>
            </body>
        </html>
    );
}
