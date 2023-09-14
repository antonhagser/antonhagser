'use server';

import { URL } from 'url';

export default async function shortenURL(
    urlToShorten: string
): Promise<[string, string] | undefined> {
    'use server';

    try {
        let request = await fetch('https://sh.antonhagser.se/api/v1/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ab7f1dd1-640b-4a34-9a27-a117e0ef575b',
            },
            body: JSON.stringify({
                url: urlToShorten,
            }),
            cache: 'no-cache',
        });

        if (!request.ok) {
            console.log('Status code: ' + request.status);
            let body = await request.text();
            console.log('Body: ' + body);

            throw new Error('Failed to shorten URL');
        }

        // Parse response
        let response = await request.json();

        let url = new URL('https://sh.antonhagser.se/' + response.id);
        return [response.id, url.toString()];
    } catch (error) {
        console.error(error);

        return undefined;
    }
}

export async function deleteURL(id: string): Promise<boolean> {
    'use server';

    try {
        let request = await fetch(
            'https://sh.antonhagser.se/api/v1/delete/' + id,
            {
                method: 'POST',
                headers: {
                    Authorization:
                        'Bearer ab7f1dd1-640b-4a34-9a27-a117e0ef575b',
                },
                cache: 'no-cache',
            }
        );

        if (!request.ok) {
            console.log('Status code: ' + request.status);
            let body = await request.text();
            console.log('Body: ' + body);

            throw new Error('Failed to delete URL');
        }

        return true;
    } catch (error) {
        console.error(error);

        return false;
    }
}
