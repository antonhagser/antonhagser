'use server';

import zxcvbn from 'zxcvbn';
import { SignInResponse, SignInResponse2FA, SignInResult } from './utils';
import { getAuthEndpoint, getApplicationId } from '../utils';

export default async function signIn(
    email: string,
    password: string
): Promise<[SignInResult, SignInResponse | SignInResponse2FA | undefined]> {
    'use server';

    // Run sign up logic
    try {
        let response = await fetch(`${getAuthEndpoint()}/basic/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                application_id: getApplicationId(),
            }),
        });

        let json = await response.json();

        // Return if successful
        if (response.ok) {
            console.log(json);
            return [SignInResult.Success, json];
        }

        // Something went wrong
        if (json.status != 'error') {
            return [SignInResult.InternalServerError, undefined];
        }

        // Check if email already exists
        if (json.error.code == 'Unauthorized') {
            return [SignInResult.Unauthorized, undefined];
        }

        // Check for 2FA
        if (json.error.code == 'NeedFurtherVerificationThrough2FA') {
            return [SignInResult.NeedFurtherVerificationThrough2FA, json];
        }

        return [SignInResult.InternalServerError, undefined];
    } catch (error) {
        console.error(error);
        return [SignInResult.InternalServerError, undefined];
    }
}
