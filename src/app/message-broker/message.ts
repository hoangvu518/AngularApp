import { Employee } from "@models/employee";


export class EmployeeSelectedMessage {
    constructor(public employeeData: Employee){ }
}

export class EmployeeInfoUpdatedMessage {
    constructor(public message: string){}
}
