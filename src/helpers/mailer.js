/* eslint-disable no-console */
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import config from '../config';

const mailer = async (usage, emailData, receiverEmail) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
      }
    });

    let template;
    let subject;
    switch (usage) {
      case 'doctor-registration':
        template = '../public/templates/doctorRegistration.ejs';
        subject = 'Doctor Registration';
        break;
      case 'reset-password':
        template = '../public/templates/doctorResetPassword.ejs';
        subject = 'Doctor Registration';
        break;
      default:
        template = '';
    }

    const data = await ejs.renderFile(path.join(__dirname, template), emailData);

    const emailOptions = {
      from: 'kennyruzindana@proqio.com',
      to: receiverEmail,
      subject,
      html: data
    };

    await transporter.sendMail(emailOptions);

    return 1;
  } catch (error) {
    throw error;
  }
};

export default mailer;
