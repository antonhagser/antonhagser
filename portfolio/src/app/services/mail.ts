'use server';

import { createTransport } from 'nodemailer';

export async function sendMail(
    subject: string,
    toEmail: string,
    otpText: string
): Promise<boolean> {
    'use server';

    console.log("Sending mail...")

    var transporter = createTransport({
        service: 'Purelymail',
        host: 'smtp.purelymail.com',
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

        console.log("Mail sent: ", result.accepted.length > 0 ? true : false);

        if (result.accepted.length > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
