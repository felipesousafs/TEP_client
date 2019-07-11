import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {User} from '../models/user';
import {Observable, ObservableInput, throwError} from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  login(email: string, password: string) {

    return this.http.post('http://localhost:3000/auth/login', {email, password}, {observe: 'response', headers})
      .subscribe(res => {
        console.log('Response from login: ', res);
        this.setSession(res.body);
        this.router.navigateByUrl('/');
      });
  }

  register(data: any): any {
    const userData = {
      username: data.name,
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation
    };

    return this.http.post<any>('http://localhost:3000/users', userData, {observe: 'response', headers})
      .subscribe(res => {
        if (res.status === 201) {
          this.openSnackBar('Cadastrado com sucesso.', 'OK');
          this.login(data.email, data.password);
        }
      });
  }

  private setSession(authResult) {
    const expiresAt = moment(new Date(authResult.exp));
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', authResult.username);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
