import { Component, OnInit } from '@angular/core';
import { Employee } from '@models/employee';
import { EmployeeService } from '@services/employee.service';
import { BehaviorSubject } from 'rxjs';
import { EmployeeInfoUpdatedMessage, EmployeeSelectedMessage } from 'src/app/message-broker/message';
import { MessageBus } from 'src/app/message-broker/message-bus';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  private employeeInfoUpdatedSubscription: any;
  
  constructor(private employeeService: EmployeeService, private messageBus: MessageBus) { }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeService.refreshNeeded$
                        .subscribe(()=> this.getEmployees());
    this.employeeInfoUpdatedSubscription = this.messageBus.of(EmployeeInfoUpdatedMessage).subscribe(message => {
      this.getEmployees();
    });
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(result => this.employees = result);
  }

  onEdit(employee: Employee) {
    this.messageBus.publish(new EmployeeSelectedMessage(employee));
  }

  ngOnDestroy() {
    this.employeeInfoUpdatedSubscription.unsubscribe();
  }

}
