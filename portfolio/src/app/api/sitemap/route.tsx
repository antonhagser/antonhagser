export interface SitemapObject {
    path: string;
    options?: SitemapOptions;
}

export interface SitemapOptions {
    changeFreq?: string;
    priority?: number;
    lastmod?: string;
}

async function generate(request: Request): Promise<string> {
    'use server';

    const data: SitemapObject[] = [
        {
            path: '/',
        },
        {
            path: '/about',
        },
        {
            path: '/projects',
        },
        {
            path: '/contact',
        },
        {
            path: '/projects/shorty',
        },
        {
            path: '/projects/pulsedb',
        },
        {
            path: '/projects/hapsy',
        },
        {
            path: '/projects/antonhagser',
        },
        {
            path: '/projects/electro-sense',
        },
    ];

    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `;

    data.forEach(({ path, options }) => {
        xmlContent += `
            <url>
                <loc>https://antonhagser.se${path}</loc>
                <lastmod>${
                    options?.lastmod ?? new Date().toISOString()
                }</lastmod>
                <changefreq>${options?.changeFreq ?? 'monthly'}</changefreq>
                <priority>${options?.priority ?? 0.5}</priority>
            </url>
        `;
    });

    xmlContent += `</urlset>`;

    return xmlContent;
}

export async function GET(request: Request) {
    let xmlContent = await generate(request);

    return new Response(xmlContent, {
        headers: { 'Content-Type': 'text/xml' },
    });
}
