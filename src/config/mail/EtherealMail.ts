import nodemailer from "nodemailer";

import {
  HandlebarsMailTemplate,
  IParseMailTemplate
} from "./HandlebarsMailTemplate";

interface IMailContact {
  name: string,
  email: string,
}

interface ISendMail {
  to: IMailContact,
  from?: IMailContact,
  subject: string,
  templateData: IParseMailTemplate,
}

class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    });

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transporter.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || "Soporte Tecnico",
        address: from?.email || "soporte@gmail.com",
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    // Mando a la consola para ver que paso con el envio del mail
    console.log("Mensaje enviado: %s", message.messageId);
    console.log("Vista previa del mail: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;