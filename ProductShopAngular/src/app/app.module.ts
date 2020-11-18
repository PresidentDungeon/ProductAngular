import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

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
import { ColorsComponent } from './colors/colors/colors.component';
import { ColorAddComponent } from './colors/color-add/color-add.component';
import { ColorDetailsComponent } from './colors/color-details/color-details.component';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductAddComponent,
    LoginComponent,
    ColorsComponent,
    ColorAddComponent,
    ColorDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ProgressbarModule,
      PaginationModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
