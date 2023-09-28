export enum SignInResult {
    Success,
    Unauthorized,
    NeedFurtherVerificationThrough2FA,
    InternalServerError
}

export interface SignInResponse {
    status: 'success',
    data: {
        access: string,
    }
}

export interface SignInResponse2FA {
    status: 'error',
    error: {
        code: 'NeedFurtherVerificationThrough2FA',
        message: string,
        details: string, // 2FA Auth flow token, send back to server with the 2FA code
    }
}
