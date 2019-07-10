import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../models/item';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

const serverUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<any>(serverUrl + '/users', {observe: 'response', headers});
  }

  getUser(username: string) {
    return this.http.get<any>(serverUrl + '/users/' + username, {observe: 'response', headers});
  }

  getBasket() {
    return this.http.get<any>(serverUrl + '/baskets', {observe: 'response', headers});
  }

  getAllItems() {
    return this.http.get<any>(serverUrl + '/items', {observe: 'response', headers});
  }

  addItemToBasket(baskedId: number, item: Item) {
    console.log('Working!', item);
    return this.http.post<any>(serverUrl + '/baskets/' + baskedId + '/items',
      {
        item: {
          name: item.name,
          cost: item.cost,
          quantity: item.quantity
        }
      },
      {observe: 'response', headers});
  }

  deleteItem(basketId: number, itemId: number) {
    return this.http.delete(serverUrl + '/baskets/' + basketId + '/items/' + itemId, {observe: 'response', headers});
  }
}
