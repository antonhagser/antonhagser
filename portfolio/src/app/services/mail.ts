'use server';

import { createTransport } from 'nodemailer';

export async function sendMail(
    subject: string,
    toEmail: string,
    otpText: string
): Promise<boolean> {
    'use server';

    var transporter = createTransport({
        service: 'Purelymail',
        host: 'smtp.purelymail.com',
        logger: true,
        debug: true,
        secure: true,
        port: 465,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    var mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject: subject,
        text: otpText,
    };

    try {
        let result = await transporter.sendMail(mailOptions);

        if (result.accepted.length > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
