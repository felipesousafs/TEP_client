import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {LoginComponent} from './public/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BasketComponent} from './pages/basket/basket.component';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'basket', component: BasketComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
