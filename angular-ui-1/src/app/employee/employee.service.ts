import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
private messageSource = new Subject<any>();
currentMessage = this.messageSource.asObservable();

baseUrl:string = "http://localhost:7777";

constructor(private httpClient : HttpClient) {}

getEmployee(){
    return this.httpClient.get(this.baseUrl + '/api/employee');
}

deleteEmployee(id) {
    return this.httpClient.post(this.baseUrl + '/delete/employee', id);   
}

setRowData(data: boolean) {
    this.messageSource.next(data)
  }

  getRowData(): Observable<any> {
    return this.messageSource.asObservable();
}
}