import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductsComponent} from './products/products/products.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/AuthGuard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: WelcomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/register', component: ProductAddComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
