import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../services/api.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'username'];
  @ViewChild(MatSort) sort: MatSort;
  users: User[] = [];
  dataSource = new MatTableDataSource();

  constructor(private api: ApiService) {
    this.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
  }

  ngOnInit() {
  }

  getUsers() {
    this.api.getUsers().subscribe(res => {
      console.log('UsersComponent - getUsers: ', res);
      const self = this;
      res.body.forEach(user => {
        self.users.push(new User(user.id, user.name, user.email, user.username));
      });
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });
  }

}
