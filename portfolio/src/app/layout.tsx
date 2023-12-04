import './globals.css';
import type { Metadata } from 'next';
import Referral from './components/referral/referral.component';

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
                {/* Referral logic, event tracking using umami */}
                <Referral />
                <main>{children}</main>
            </body>
        </html>
    );
}
