import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from '../common/email.service';
import { EMPLOYEE_REPOSITORY } from './constant/employee.constants';
import { EmployeeRepository } from './interfaces/employee-repository.interface';

@Injectable()
export class BirthdayService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private employeeRepository: EmployeeRepository,   
     private emailService: EmailService
  ) {}

  async sendGreetings(today: Date): Promise<void> {
    const employees = await this.employeeRepository.findEmployeesBornOn(today.getMonth() + 1, today.getDate());
    employees.forEach(employee => {
      this.emailService.send(
        employee.email,
        'Happy birthday!',
        `Happy birthday, dear ${employee.firstName}!`
      );
    });
  }
}