import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log("GET /api/cloudflare: " + process.env.CLOUDFLARE_TURNSTILE_SITE_KEY);

    return NextResponse.json({
        cloudflareSiteKey: process.env.CLOUDFLARE_TURNSTILE_SITE_KEY,
    });
}
