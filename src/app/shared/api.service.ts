import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private dataService: DataService) {}
  private apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';

  postEmployee(data: any) {
    // return this.http.post<any>('http://localhost:3000/posts', data).pipe(
    //   map((res: any) => {
    //     return res;
    //   })
    // );
    return this.dataService.addEmployee(data);
  }

  getEmployee() {
    // return this.http.get<any>(this.apiUrl).pipe(
    //   map((res: any) => {
    //     return res;
    //   })
    // );
    return this.dataService.getAllEmployees();
  }

  updateEmployee(data: any, id: number) {
    // return this.http.put<any>('http://localhost:3000/posts/' + id, data).pipe(
    //   map((res: any) => {
    //     return res.data;
    //   })
    // );
    return this.dataService.updateEmployee(id, data);
  }

  deleteEmployee(id: number) {
    // return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
    //   map((res: any) => {
    //     return res;
    //   })
    // );
    return this.dataService.deleteEmployee(id);
  }
}
