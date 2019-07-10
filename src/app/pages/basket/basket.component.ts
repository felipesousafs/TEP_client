import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Basket} from '../../models/basket';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/user';
import {Item} from '../../models/item';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'cost', 'quantity', 'action'];
  dataSource = new MatTableDataSource();
  basketItems: Item[] = [];
  selection = new SelectionModel<any>(true, []);

  nameCtrl = new FormControl();
  costCtrl2 = new FormControl();
  quantityCtrl2 = new FormControl();
  filteredStates: Observable<Item[]>;
  items: Item[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.getBasket();
    this.dataSource = new MatTableDataSource(this.basketItems);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
    this.api.getAllItems().subscribe(resp => {
      resp.body.forEach(item => {
        this.items.push(new Item(item.name, item.cost, item.quantity, item.id));
      });
    });
    this.filteredStates = this.nameCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterStates(item) : this.items.slice())
      );

    this.form = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      quantity: ['', Validators.required]
    });
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  private _filterStates(value: string): Item[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
  }

  clearForm() {
    this.nameCtrl.reset();
    this.costCtrl2.reset();
    this.quantityCtrl2.reset();
  }

  onAddItem() {
    console.log('nameCtrl', this.nameCtrl);
    console.log('costCtrl2', this.costCtrl2);
    console.log('quantityCtrl2', this.quantityCtrl2);
    if (this.nameCtrl.value && this.costCtrl2.value && this.quantityCtrl2.value) {
      this.api.addItemToBasket(1, new Item(this.nameCtrl.value, this.costCtrl2.value, this.quantityCtrl2.value)).subscribe(res => {
        console.log('After Add Item: ', res);
        if (res.status === 201) {
          this.getBasket();
          this.clearForm();
        }
      });
    }
  }

  onDeleteItem(item: Item) {
    this.api.deleteItem(item.basketId, item.id).subscribe(res => {
      console.log('After Delete Item: ', res);
      if (res.ok === true && res.status === 204) {
        this.getBasket();
      }
    });
  }

}
