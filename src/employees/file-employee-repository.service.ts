import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './interfaces/employee-repository.interface';
import { Employee } from './entities/employee.entity';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const readFile = util.promisify(fs.readFile);

@Injectable()
export class FileEmployeeRepository implements EmployeeRepository {
  async findEmployeesBornOn(month: number, day: number): Promise<Employee[]> {
    const data = await readFile(path.join(__dirname, '../../../data/employees.csv'), 'utf8');
    return data.split('\n').map(line => {
      const [lastName, firstName, dob, email] = line.split(',');
      const dateOfBirth = new Date(dob);
      return new Employee(lastName, firstName, dateOfBirth, email);
    }).filter(emp => emp.dateOfBirth.getMonth() + 1 === month && emp.dateOfBirth.getDate() === day);
  }
}
