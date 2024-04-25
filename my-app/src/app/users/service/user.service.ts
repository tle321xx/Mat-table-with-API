import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../user';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 8. config API หลังจากนั้นทำ datasource service
  baseUrl = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }

  getAllUsers(sort: Sort): Observable<UserInterface[]>{
    // 17. params and add params inside api
    const params = new HttpParams()
    .set('_sort', sort.active)
    .set('_order', sort.direction)
    // ใส่ <UserInterface[]> ด้านล่างเพื่อแก้ error return
    return this.http.get<UserInterface[]>(`${this.baseUrl}`,{params})
  }
}
