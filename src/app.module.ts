import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { MailerService } from './mailer/mailer.service';
import { GatewayModule } from './gatemay/gateway.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), GatewayModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, EmailService, MailerService, PrismaService],
})
export class AppModule {}
