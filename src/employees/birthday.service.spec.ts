import { Test, TestingModule } from '@nestjs/testing';
import { BirthdayService } from './birthday.service';
import { EmailService } from '../common/email.service';
import { EmployeeRepository } from './interfaces/employee-repository.interface';
import { EMPLOYEE_REPOSITORY } from './constant/employee.constants';


describe('BirthdayService', () => {
  let service: BirthdayService;
  let mockEmployeeRepository: Partial<EmployeeRepository>;
  let mockEmailService: Partial<EmailService>;

  beforeEach(async () => {
    mockEmployeeRepository = {
      findEmployeesBornOn: jest.fn().mockResolvedValue([
        { lastName: 'Doe', firstName: 'John', dateOfBirth: new Date(), email: 'john.doe@example.com' }
      ])
    };

    mockEmailService = {
      send: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirthdayService,
        { provide: EMPLOYEE_REPOSITORY, useValue: mockEmployeeRepository },
        { provide: EmailService, useValue: mockEmailService }
      ],
    }).compile();

    service = module.get<BirthdayService>(BirthdayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not send emails when there are no birthdays today', async () => {
    mockEmployeeRepository.findEmployeesBornOn = jest.fn().mockResolvedValue([]);
    const today = new Date('2024-01-01');
    await service.sendGreetings(today);

    expect(mockEmployeeRepository.findEmployeesBornOn).toHaveBeenCalledWith(1, 1);
    expect(mockEmailService.send).not.toHaveBeenCalled();
  });

  it('should send greetings to employees whose birthday is today', async () => {
    const today = new Date('2024-05-03');
    await service.sendGreetings(today);
    
    expect(mockEmployeeRepository.findEmployeesBornOn).toHaveBeenCalledWith(5, 3);
    expect(mockEmailService.send).toHaveBeenCalledWith(
      'john.doe@example.com',
      'Happy birthday!',
      'Happy birthday, dear John!'
    );
  });
});