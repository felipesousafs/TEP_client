import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/users', {observe: 'response', headers});
  }

  getUser(username: string) {
    return this.http.get<any>('http://localhost:3000/users/' + username, {observe: 'response', headers});
  }
}
