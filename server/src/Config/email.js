import Email from 'email-templates';
import nodemailer from 'nodemailer';

/* 
  Use mailtrap for testing and switch to 
  sendinblue when going live.
*/

const transporter = nodemailer.createTransport({
  //host: 'smtp.mailtrap.io',
  host: 'localhost',
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_TRAP_USERNAME,
    pass: process.env.MAIL_TRAP_PASSWORD
  }
});

export const email = new Email({
  send: true,
  transport: transporter,
  preview: true, // to preview emails in your own browser
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

export const sendEmail = async (toEmail, template, locals) => {
  await email.send({
    template: template,
    message: {
      to: toEmail
    },
    locals
  });
};
