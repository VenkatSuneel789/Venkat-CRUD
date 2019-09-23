import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
baseUrl:string = "http://localhost:7777";

constructor(private httpClient : HttpClient) {}

saveEmployee(data){
    return this.httpClient.post(this.baseUrl + '/save/employee', data);
}

updateEmployee(data){
    return this.httpClient.post(this.baseUrl + '/update/employee', data);
}
}