import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CreateEmployee, Employee } from '@models/employee';
import { BehaviorSubject, Observable, Subject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.API_BASE_URL;
  private _refreshNeeded$ = new Subject<void>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/Employee/GetAllEmployees`)
  }

  updateEmployeeInfo(employee: Employee): Observable<any> {
    return this.http.patch(`${this.baseUrl}/Employee/UpdateEmployeeInfo`, employee, this.httpOptions)
                    .pipe(
                      tap(() =>{
                        this._refreshNeeded$.next();
                      })
                    );
  }

  createEmployee(employee: CreateEmployee): Observable<any> {
    return this.http.post(`${this.baseUrl}/Employee/CreateEmployee`, employee, this.httpOptions)
                    .pipe(
                      tap(() =>{
                        this._refreshNeeded$.next();
                      })
                    );
  }

  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }
}
