import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateEmployee } from '@models/employee';
import { EmployeeService } from '@services/employee.service';
import { MessageBus } from 'src/app/message-broker/message-bus';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  private employeeSelectedSubscription: any;
  employeeCreateForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.maxLength(10)]],
    managerId: [''],
    salary: ['', [Validators.max(999999)]],
    email: ['', [Validators.required, Validators.email]],
  });;
  constructor(private messageBus: MessageBus, private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }



  // employeeSelected(): boolean {
  //   return this.editedEmployee === undefined ? false : true;
  // }
  ngOnDestroy() {
    this.employeeSelectedSubscription.unsubscribe();
  }

  onSubmit() {
  
    const createEmployee = <CreateEmployee>this.employeeCreateForm.value;
    this.employeeService.createEmployee(createEmployee).subscribe();

  }

  

  get firstName() { return this.employeeCreateForm.get('firstName'); }
  get lastName() { return this.employeeCreateForm.get('lastName'); }
  get email() { return this.employeeCreateForm.get('email'); }
  get managerId() { return this.employeeCreateForm.get('managerId'); }
  get salary() { return this.employeeCreateForm.get('salary'); }

}
