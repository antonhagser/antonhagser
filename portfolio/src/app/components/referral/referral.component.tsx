'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * This component is used to track page referrals through query params.
 *
 * This is done through the umami tracker, which is a self-hosted analytics tool.
 */
function ReferralInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    /**
     * Removes the query params from the pathname.
     */
    const getPathnameWithoutQueryParams = (pathname: string) => {
        const index = pathname.indexOf('?');
        if (index === -1) {
            return pathname;
        }
        return pathname.substring(0, index);
    };

    /**
     * Track page referrals through query params.
     */
    useEffect(() => {
        // Custom page referral through query params, to track if the website was loaded in by a link from ex. my CV.
        // This is done through the umami tracker, which is a self-hosted analytics tool.

        if (typeof umami === 'undefined') return;

        // Check if the query params are present.
        if (searchParams.has('ref') && searchParams.has('target')) {
            const ref = searchParams.get('ref') as string;
            const target = searchParams.get('target') as string;

            // Track the page referral.
            if (ref === 'cv' && target.length > 0) {
                console.log('Tracking page referral from CV.');
                umami.track('page-referral', {
                    ref: 'cv',
                    target,
                });
            }

            // Remove the query params from the URL.
            router.replace(getPathnameWithoutQueryParams(pathName));
        }
    }, [searchParams, pathName, router]);

    return <></>;
}

/**
 * This component is used to track page referrals through query params.
 * 
 * This is done through the umami tracker, which is a self-hosted analytics tool.
 */
export default function Referral() {
    const [isMounted, setIsMounted] = useState(false);

    return (
        <>
            <Script
                async
                defer
                src="https://antonhagser.se/locale/script.js"
                data-website-id="17c5d446-b3e2-48f8-a81a-504301bad0e5"
                data-host-url="https://umami.antonhagser.se"
                onLoad={() => setIsMounted(true)}
            ></Script>
            {isMounted && <ReferralInner />}
        </>
    );
}
