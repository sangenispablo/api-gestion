import nodemailer from "nodemailer";

import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

interface IMailContact {
  name: string,
  email: string,
}

interface ITemplateVars {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string,
  vars: ITemplateVars,
}

interface ISendMail {
  to: IMailContact,
  from?: IMailContact,
  subject: string,
  templateData: IParseMailTemplate,
}

class EtherealMail {
  static async sendMail({to, from, subject, templateData}: ISendMail): Promise<void> {
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

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transport.sendMail({
      from: {
        name: from?.name || "Soporte Tecnico",
        address: from?.email || "soporte@gmail.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
    console.log("Mensaje enviado: %s", message.messageId);
    console.log("Vista previa del mail: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;