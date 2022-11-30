import nodemailer from "nodemailer";

interface ISendMail {
    to: string,
    body: string
}

class EtherealMail {
    static async sendMail({ to, body }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            }
        });
        const message = await transport.sendMail({
            from: 'gestion@gestion.dev',
            to,
            subject: 'Recuperación de Contraseña',
            text: body
        });
        console.log('Mensaje enviado: %s', message.messageId);
        console.log('Vista previa del mail: %s', nodemailer.getTestMessageUrl(message));


    }
}

export default EtherealMail;