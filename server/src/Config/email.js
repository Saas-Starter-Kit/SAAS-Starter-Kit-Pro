import Email from 'email-templates';
import nodemailer from 'nodemailer';

/* 
  Use mailtrap for testing and switch to 
  sendinblue when going live.
*/
let transport;

let devTransport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  //host: 'localhost', //will cause error but show email preview
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_TRAP_USERNAME,
    pass: process.env.MAIL_TRAP_PASSWORD
  }
});

const prodTransport = nodemailer.createTransport({
  service: 'SendinBlue',
  auth: {
    user: process.env.SendInBlue_User,
    pass: process.env.SendInBlue_Password
  }
});

export const email = new Email({
  send: true,
  transport: devTransport,
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
