import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {ProductsComponent} from "./product/products/products.component";
import {ProductDetailsComponent} from "./product/product-details/product-details.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: WelcomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/register', component: ProductAddComponent},
  {path: 'products/:id', component: ProductDetailsComponent}

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
