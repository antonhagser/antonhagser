import getConfig from 'next/config';

export function getCloudflareSecretKey(): string {
    let key = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string;

    if (key.length > 0) {
        return key;
    }

    throw new Error('Could not get Cloudflare secret key');
}

export function getCloudflareSiteKey(): string {
    let key = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string;

    if (key.length > 0) {
        return key;
    }

    throw new Error('Could not get Cloudflare site key');
}
