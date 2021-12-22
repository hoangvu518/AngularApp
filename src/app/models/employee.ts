export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

export interface CreateEmployee{
    firstName: string,
    lastName: string,
    managerId: number| undefined,
    salary: number| undefined,
    email: string,
}