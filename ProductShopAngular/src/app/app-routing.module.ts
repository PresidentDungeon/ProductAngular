import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductsComponent} from './products/products/products.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/AuthGuard';
import {ColorsComponent} from './colors/colors/colors.component';
import {ColorAddComponent} from './colors/color-add/color-add.component';
import {ColorDetailsComponent} from './colors/color-details/color-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/register', component: ProductAddComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'colors', component: ColorsComponent},
  {path: 'colors/register', component: ColorAddComponent, canActivate: [AuthGuard]},
  {path: 'colors/:id', component: ColorDetailsComponent, canActivate: [AuthGuard]}


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
