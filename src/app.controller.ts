import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { MailerService } from './mailer/mailer.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) { }

  @Post('send-invite')
  async sendInvite(@Body() userData: any): Promise<any> {
    try {
      console.log("BODY: ", userData);

      const res = await this.prismaService.user.create({
        data: {
          email: userData?.email,
          status: 2,
          refCode: userData?.refCode
        }
      })

      if (res) {
        console.log('User created:', res);
        const response = await this.emailService.sendPasswordResetCode(userData?.email, userData?.refCode);
        console.log('Email sent:', response);

        return { user: res, emailResponse: response, message: "User created successfully" };
      }
    } catch (err) {
      console.error('Error sending email via MailerService:', err);
    }
    return this.appService.getHello();
  }

  @Post('signin')
  async signin(@Body() userData: any): Promise<any> {
    try {
      console.log("BODY: ", userData);

      const res = await this.prismaService.user.findFirst({
        where: {
          email: userData?.email,
          password: userData?.password
        }
      })

      if (res) {
        console.log('User found:', res);

        return { user: res, message: "User found successfully" };
      }
    } catch (err) {
      console.error('Error sending email via MailerService:', err);
    }
    return this.appService.getHello();
  }

  @Put('signup')
  async signup(@Body() userData: any): Promise<any> {
    try {
      console.log("BODY: ", userData);

      const res = await this.prismaService.user.updateMany({
        where: {
          email: userData?.email,
          refCode: userData?.refCode ? +userData?.refCode : null
        },
        data: { ...userData, refCode: userData?.refCode ? +userData?.refCode : null, status: 1 }
      })

      if (res) {
        console.log('User complete:', res);

        const prodRes = await this.prismaService.product.create({
          data: {
            email: userData?.email,
            name: "freezer",
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
          },
        })


        return { user: res, product: prodRes, message: "User create complete." };
      }
    } catch (err) {
      console.error('Error sending email via MailerService:', err);
    }
    return this.appService.getHello();
  }

  @Get('get-invities')
  async getInvities(): Promise<any> {
    try {
      const res = await this.prismaService.user.findMany({
        // where: {
        //   email: userData?.email
        // }
      })

      if (res) {
        console.log('Users found:', res);
        return { users: res, message: "Users retrieved successfully" };
      }
    } catch (err) {
      console.error('Error retrieving users:', err);
    }
    return this.appService.getHello();
  }

  @Get('get-products')
  async getProducts(@Query() query: any): Promise<any> {
    try {
      const res = await this.prismaService.product.findMany({
        where: {
          email: {
            not: query?.email
          }
        }
      })

      if (res) {
        console.log('Products found:', res);
        return { products: res, message: "Products retrieved successfully" };
      }
    } catch (err) {
      console.error('Error retrieving users:', err);
    }
    return this.appService.getHello();
  }

  @Get('get-single-products')
  async getSingleProducts(@Query() query: any): Promise<any> {
    try {
      const res = await this.prismaService.product.findFirst({
        where: {
          id: +query?.id
        }
      })

      if (res) {
        console.log('Product found:', res);
        return { products: res, message: "Product retrieved successfully" };
      }
    } catch (err) {
      console.error('Error retrieving users:', err);
    }
    return this.appService.getHello();
  }
}