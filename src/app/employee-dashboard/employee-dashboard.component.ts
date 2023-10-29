import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  empModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      salary: ['', Validators.required],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.empModelObj.firstName = this.formValue.value.firstName;
    this.empModelObj.lastName = this.formValue.value.lastName;
    this.empModelObj.email = this.formValue.value.email;
    this.empModelObj.mobile = this.formValue.value.mobile;
    this.empModelObj.salary = this.formValue.value.salary;

    this.dataService.addEmployee(this.empModelObj);
    // this.api.postEmployee(this.empModelObj).subscribe(
    //   res =>
    //   {
    //     console.log(res);
    //     alert("Employee added successfully!");
    //     this.formValue.reset();
    //     let ref = document.getElementById("cancel");
    //     ref?.click();
    //     this.getAllEmployee();
    //   },
    //   error =>
    //   {
    //     alert("Oops! Something went wrong"+error);
    //   }
    //   );
  }

  getAllEmployee() {
    // this.api.getEmployee().subscribe(
    //   res=> {
    //     this.employeeData = res;
    //   },);
    this.employeeData = this.dataService.getAllEmployees();
  }

  deleteEmployee(row: any) {
    // this.api.deleteEmployee(row).subscribe(
    //   res => {
    //     alert("Employee Data successfuly deleted!!");
    //     this.getAllEmployee();
    //   },
    // );

    this.dataService.deleteEmployee(row.id);
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.empModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetail() {
    this.empModelObj.firstName = this.formValue.value.firstName;
    this.empModelObj.lastName = this.formValue.value.lastName;
    this.empModelObj.email = this.formValue.value.email;
    this.empModelObj.mobile = this.formValue.value.mobile;
    this.empModelObj.salary = this.formValue.value.salary;

    // this.api.updateEmployee( this.empModelObj, this.empModelObj.id).subscribe(
    //   res => {
    //     alert("Data updated successfully!");
    //     let ref = document.getElementById("cancel");
    //     ref?.click();
    //     this.getAllEmployee();
    //   },
    // );

    this.dataService.updateEmployee(this.empModelObj.id, this.empModelObj);
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
