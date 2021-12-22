import { Component, OnInit } from '@angular/core';
import { Employee } from '@models/employee';
import { EmployeeInfoUpdatedMessage, EmployeeSelectedMessage } from 'src/app/message-broker/message';
import { MessageBus } from 'src/app/message-broker/message-bus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  private employeeSelectedSubscription: any;
  private originalEmployee: Employee | undefined;
  employeeForm = this.fb.group({
    id: [0, Validators.required],
    firstName: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
  });;
  constructor(private messageBus: MessageBus, private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeSelectedSubscription = this.messageBus.of(EmployeeSelectedMessage).subscribe(message => {
      console.log(message.employeeData);
      this.originalEmployee = message.employeeData;
      this.patchFormValue(message.employeeData)
    });
  }

  patchFormValue(employee: Employee | undefined): void {
    this.employeeForm.patchValue({
      id: employee?.id,
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      email: employee?.email,
    });
  }

  resetEditEmployee() {
    this.patchFormValue(this.originalEmployee);
  }

  // employeeSelected(): boolean {
  //   return this.editedEmployee === undefined ? false : true;
  // }
  ngOnDestroy() {
    this.employeeSelectedSubscription.unsubscribe();
  }

  onSubmit() {
    console.log("Submitted");
    const employee = <Employee>this.employeeForm.value;
    console.log(employee);
    this.employeeService.updateEmployeeInfo(employee).subscribe();
    this.messageBus.publish(new EmployeeInfoUpdatedMessage("Employee Info Updated"));
  }

  

  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('lastName'); }
  get email() { return this.employeeForm.get('email'); }
}
