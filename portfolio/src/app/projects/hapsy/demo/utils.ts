export function getAuthEndpoint(): string {
    // Get from environment
    return process.env.AUTH_ENDPOINT || 'http://127.0.0.1:8080';
}

export function getAuthgRPCEndpoint(): string {
    // Get from environment
    return process.env.GRPC_AUTH_ENDPOINT || 'localhost:58080';
}

export function getApplicationId(): string {
    // Get from environment
    return process.env.APPLICATION_ID || '2663289091784704';
}
