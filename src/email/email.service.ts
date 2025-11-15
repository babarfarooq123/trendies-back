import * as Brevo from '@getbrevo/brevo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private emailAPI: Brevo.TransactionalEmailsApi;

    constructor(private configService: ConfigService) {
        const apiKey = configService.get<string>('BREVO_API_KEY');
        if (!apiKey) {
            throw new Error('BREVO_API_KEY is not defined');
        }

        console.log('Using BREVO_API_KEY:', apiKey);

        this.emailAPI = new Brevo.TransactionalEmailsApi();
        this.emailAPI.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    }

    async sendPasswordResetCode(to: string, refCode: string) {
        // Correct
        const email = new Brevo.SendSmtpEmail();
        email.subject = `You have received an invitation!`;
        email.to = [{ email: to }];
        email.templateId = 41;
        email.params = {
            subject: `You have received an invitation`,
            greeting: `Good night`,
            senderName: `Trendies Team`,
            signupUrl: 'http://localhost:3001/signup?email=' + encodeURIComponent(to) + '&refCode=' + encodeURIComponent(refCode),
        };
        email.sender = { email: 'contact@trendiesmaroc.com', name: 'Trendies Team' };

        try {
            const result = await this.emailAPI.sendTransacEmail(email);
            console.log('Email sent successfully:', result.body);
            return result;
        } catch (err) {
            console.error('❌ Error sending email:', err.response?.text || err.message, err);
            // throw err;
            return 1;
        }
    }
}
