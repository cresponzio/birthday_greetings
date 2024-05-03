import { Module } from '@nestjs/common';
import { EmailService } from './common/email.service';
import { BirthdayService } from './employees/birthday.service';
import { FileEmployeeRepository } from './employees/file-employee-repository.service';

@Module({
  providers: [
    BirthdayService,
    { provide: 'EmployeeRepository', useClass: FileEmployeeRepository },
    EmailService
  ],
})
export class AppModule {}
