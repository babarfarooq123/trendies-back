// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // use true for 465
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  async sendMail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: 'contact@trendiesmaroc.com',
      to,
      subject,
      html,
    });
  }
}
