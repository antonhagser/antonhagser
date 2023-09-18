import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    return NextResponse.json({
        cloudflareSiteKey: process.env.CLOUDFLARE_TURNSTILE_SITE_KEY,
    });
}
