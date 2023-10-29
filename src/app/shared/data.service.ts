// local-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private employees: any[] = []; // Your local data store

  constructor() {
    // Initialize with some sample data
    this.employees = [
      {
        id: 1,
        firstName: 'Tiger',
        lastName: 'Nixon',
        email: 'tiger@mail.com',
        mobile: '+9230554521255',
        salary: 320800,
      },
      {
        id: 2,
        firstName: 'Garrett',
        lastName: 'Winters',
        email: 'garrett@mail.com',
        mobile: '+923055131255',
        salary: 500000,
      },
      // Add more sample data
    ];
  }

  getAllEmployees() {
    return this.employees;
  }

  //   addEmployee(employee: any) {
  //     const newId = this.employees.length + 1;
  //     employee.id = newId;
  //     this.employees.push(employee);
  //     return employee;
  //   }

  //   //   updateEmployee(id: number, data: any) {
  //   //     const index = this.employees.findIndex((emp) => emp.id === id);
  //   //     if (index !== -1) {
  //   //       this.employees[index] = { ...this.employees[index], ...data };
  //   //       return this.employees[index];
  //   //     }
  //   //     return null;
  //   //   }

  //   updateEmployee(id: number, data: any) {
  //     const index = this.employees.findIndex((emp) => emp.id === id);
  //     if (index !== -1) {
  //       // Create a new object with the updated data
  //       const updatedEmployee = { ...this.employees[index], ...data };

  //       // Replace the old employee object with the new one
  //       this.employees[index] = updatedEmployee;

  //       return updatedEmployee; // Return the updated object
  //     }
  //     return null;
  //   }

  addEmployee(employee: any) {
    const newId = this.employees.length + 1;
    // Deep clone the employee object to avoid affecting other records
    const clonedEmployee = JSON.parse(JSON.stringify(employee));
    clonedEmployee.id = newId;
    this.employees.push(clonedEmployee);
    return clonedEmployee;
  }

  updateEmployee(id: number, data: any) {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      // Deep clone the existing employee object
      const clonedEmployee = JSON.parse(JSON.stringify(this.employees[index]));
      // Merge the new data into the cloned object
      Object.assign(clonedEmployee, data);
      // Replace the old employee object with the new one
      this.employees[index] = clonedEmployee;
      return clonedEmployee;
    }
    return null;
  }

  deleteEmployee(id: number) {
    console.log('here id', id, this.employees);
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
}
