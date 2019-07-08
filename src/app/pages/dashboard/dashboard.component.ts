import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  constructor(private api: ApiService) {
    const username = localStorage.getItem('username');
    this.api.getUser(username).subscribe(res => {
      console.log('Dashboard - currentUser: ', res);
      this.currentUser = new User(res.body.id, res.body.name, res.body.email, res.body.username);
    });
  }

  ngOnInit() {
  }

}
