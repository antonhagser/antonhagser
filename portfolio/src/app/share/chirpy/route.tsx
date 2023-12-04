import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    // Your webhook URL
    try {
        const doubleEncodedWebhookUrl =
            'YUhSMGNITTZMeTlrYVhOamIzSmtMbU52YlM5aGNHa3ZkMlZpYUc5dmEzTXZNVEU0TVRJd05ERTBORFkzTkRBMU5ESXlOUzl4VVVwcU9XRmxZVVUyWm05QmNVbHBUV1oxYW1sS1pUTjVOSFZVY1dKc1dHOXlUMnBUUmtWbmFXeEVhemQ2VTFONVZFMUpNVXRvZVZrM1FXbEhZV2N3YUZCVExRPT0=';

        const singleEncodedWebhookUrl = Buffer.from(
            doubleEncodedWebhookUrl,
            'base64'
        ).toString('utf-8');

        const webhookUrl = Buffer.from(
            singleEncodedWebhookUrl,
            'base64'
        ).toString('utf-8');

        // Message you want to send
        const message = {
            content: `Somebody just clicked the button! 🎉 + ${
                request.ip
            } - ${request.headers.get('user-agent')}
         - ${request.headers.get('x-forwarded-for')}\n
            - ${request.headers.get('cf-ipcountry')}\n
            - ${request.headers.get('cf-ray')}\n
            - ${request.headers.get('cf-visitor')}\n
            - ${request.headers.get('cf-connecting-ip')}`,
        };

        if (message.content.length > 10000) {
            message.content = `Somebody just clicked the button! 🎉 + ${
                request.ip
            } - ${request.headers.get('user-agent')}`;
        }

        // Send a POST request to the Discord webhook
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    } catch (_) {
        console.log('Error sending message to Discord.');
        console.log(request.ip);
        console.log(request.headers.get('user-agent'));
        console.log(request.headers.get('x-forwarded-for'));
        console.log(request.headers.get('cf-ipcountry'));
        console.log(request.headers.get('cf-ray'));
        console.log(request.headers.get('cf-visitor'));
        console.log(request.headers.get('cf-connecting-ip'));
    }

    return Response.redirect(
        'https://drive.google.com/file/d/1Uyn83guUEQmxo-RlT_n8I35k_cbs2Ijj/view?usp=sharing'
    );
}
