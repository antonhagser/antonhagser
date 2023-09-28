'use server';

import zxcvbn from 'zxcvbn';
import {
    getApplicationId,
    getAuthEndpoint,
    getAuthgRPCEndpoint,
} from '../utils';
import { SignUpResult } from './utils';
import {
    BasicAuthClient,
    ErrorCode,
    RegisterRequest,
    RegisterResponse,
    VerificationMethod,
} from '@/app/models/basic';
import * as grpc from '@grpc/grpc-js';

interface Error {
    code: ErrorCode;
    message: string;
}

export default async function signUp(
    email: string,
    password: string
): Promise<SignUpResult> {
    'use server';

    let result = zxcvbn(password, [email]);
    if (result.score < 2) {
        return SignUpResult.InvalidPassword;
    }

    // Init gRPC client
    const client = new BasicAuthClient(
        getAuthgRPCEndpoint(),
        grpc.credentials.createInsecure()
    );

    const request: RegisterRequest = {
        email,
        password,
        applicationId: '2663289091784704',
        verificationMethod: VerificationMethod.EmailLink,
    };

    // Call gRPC register method
    try {
        await asyncgRPCRegister(client, request);
        console.log('Successfully registered user');

        return SignUpResult.Success;
    } catch (error: any) {
        console.log('Error registering user: ', error);

        try {
            const details = JSON.parse(error.details);

            if (isCustomError(details)) {
                const parsedError = details as Error;
                const code = Number(ErrorCode[parsedError.code]);

                switch (code) {
                    case ErrorCode.AlreadyExists:
                        return SignUpResult.AlreadyExists;
                    case ErrorCode.EmailFormat:
                        return SignUpResult.InvalidEmailAddress;
                    case ErrorCode.PasswordFormat:
                        return SignUpResult.InvalidPassword;
                    case ErrorCode.ApplicationDoesNotExist:
                        return SignUpResult.ApplicationDoesNotExist;
                    default:
                        return SignUpResult.InternalServerError;
                }
            }
        } catch {
            return SignUpResult.InternalServerError;
        }

        return SignUpResult.InternalServerError;
    }
}

function isCustomError(error: any): error is Error {
    return (
        error &&
        typeof error.code === 'string' &&
        Object.values(ErrorCode).includes(error.code)
    );
}

async function asyncgRPCRegister(
    client: BasicAuthClient,
    request: RegisterRequest
): Promise<RegisterResponse> {
    return new Promise((resolve, reject) => {
        client.register(request, (error, response) => {
            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
}
