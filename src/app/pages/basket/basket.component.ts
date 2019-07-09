import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Basket} from '../../models/basket';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/user';
import {Item} from '../../models/item';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'cost', 'quantity'];
  dataSource = new MatTableDataSource();
  basketItems: Item[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService) {
    this.getBasket();
    this.dataSource = new MatTableDataSource(this.basketItems);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
  }

  ngOnInit() {
  }

  getBasket() {
    this.api.getBasket().subscribe(res => {
      console.log('UsersComponent - getBasket: ', res);
      const self = this;
      const basket = new Basket(res.body);
      self.basketItems = basket.items;
      this.dataSource = new MatTableDataSource(this.basketItems);
      this.dataSource.sort = this.sort;
    });
  }

}
