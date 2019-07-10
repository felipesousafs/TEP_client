import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './pages/users/users.component';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Interceptor} from './_helpers/auth-interceptor.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BasketComponent} from './pages/basket/basket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    Interceptor,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
