import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  send(to: string, subject: string, body: string): void {
    console.log(`Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }
}