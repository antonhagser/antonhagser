'use server';

import { headers } from 'next/headers';
import { sendMail } from '../services/mail';
import { getCloudflareSecretKey } from './utils';

interface MailData {
    reason: string;
    message: string;
}

export default async function trySendContactForm(
    turnstileResponse: string,
    { reason, message }: MailData
): Promise<boolean> {
    'use server';

    // Get client ip from cloudflare request headers
    const clientHeaders = headers();
    const ip =
        clientHeaders.get('cf-connecting-ip') ??
        clientHeaders.get('x-forwarded-for') ??
        clientHeaders.get('x-real-ip') ??
        undefined;

    // If the client ip is undefined, show error message
    if (!ip) {
        console.log('Client ip is undefined');
        return false;
    }

    // Check if turnstile response is valid
    const form = new URLSearchParams();
    form.append('secret', getCloudflareSecretKey());
    form.append('response', turnstileResponse);
    form.append('remoteip', ip as string);

    const result = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        { method: 'POST', body: form }
    );

    if (!result.ok) {
        console.log('Turnstile response is not ok');
        return false;
    }

    const outcome = await result.json();
    if (outcome.success !== true) {
        console.log('Turnstile response is not successful');
        console.log("Outcome: ", outcome);
        return false;
    }

    try {
        // Send the mail
        await sendMail(reason, 'anton.hagser@epsidel.se', message);

        // Show success message
        return true;
    } catch (error) {
        return false;
    }
}
