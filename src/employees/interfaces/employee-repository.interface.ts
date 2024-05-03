import { Employee } from '../entities/employee.entity';

export interface EmployeeRepository {
  findEmployeesBornOn(month: number, day: number): Promise<Employee[]>;
}