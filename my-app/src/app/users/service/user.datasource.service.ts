import { UserService } from './user.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { UserInterface } from '../user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
// 9. เตรียมข้อมูล datasource ที่นี่ then เอาข้อมูลที่ได้ไปใส่ datasource
export class UserDatasourceService extends DataSource<UserInterface> {
  user$ = new BehaviorSubject<UserInterface[]>([]);

  // ทำตัวนี้หลังจากทำ function loadUsers
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private UserService: UserService){
    super()
  }

  // our connect must return an observable
  connect(): Observable<UserInterface[]> {
    return this.user$.asObservable();
  }

  override disconnect(collectionViewer: CollectionViewer): void {
      this.user$.complete()
  }

  loadUsers(sort: Sort): void {
    // ทำ service ก่อนค่อยมาทำ load หลังจากนั้นนำข้อมูลที่ได้ไปใส่ใน datasource
    this.isLoading$.next(true);
    this.UserService.getAllUsers(sort).subscribe(user => {
      this.user$.next(user);
      this.isLoading$.next(false);
    })
  }
}
