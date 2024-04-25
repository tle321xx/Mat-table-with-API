import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserDatasourceService } from '../service/user.datasource.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  // 4. implement displayedColumns then html
  displayedColumns: string[] = ['id', 'name', 'age']
  // 10. เอาข้อมูลมาใส่ใน datasource แล้วก็ต้อง inject ด้วย
  dataSource = new UserDatasourceService(this.service)

  constructor(private service: UserService){

  }

  // 11. fetch data ตั้งแต่ 12 คือ sorts ที่ user html
  // 16 . provide active direction then build params in service
  ngOnInit(): void {
      this.dataSource.loadUsers({active: 'id', direction: 'asc'})
  }

  // 15. config sort and เติม (sort: Sort) ทุกที่ที่มี error
  sortUsers(sort: Sort): void{
    this.dataSource.loadUsers(sort)
  }
}
