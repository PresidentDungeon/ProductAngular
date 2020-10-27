import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products/products.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductAddComponent,
    LoginComponent
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
