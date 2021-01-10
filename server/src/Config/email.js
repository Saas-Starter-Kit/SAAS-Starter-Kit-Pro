import Email from 'email-templates';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 465,
  secure: false,
  auth: {
    user: '53652661c36a4b',
    pass: '552656e65ce1eb'
  }
});

export const email = new Email({
  send: true,
  transport: transporter,
  preview: false,
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

export const sendEmail = () => {
  email
    .send({
      template: 'password',
      message: {
        to: 'john@snow.com'
      },
      locals: {
        fname: 'John',
        lname: 'Snow'
      }
    })
    .then(() => console.log('email has been sent!'));
};
