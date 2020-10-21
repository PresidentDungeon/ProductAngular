import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsComponent } from './product/products/products.component';
import {ProductDetailsComponent} from "./product/product-details/product-details.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
