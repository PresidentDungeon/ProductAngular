import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './Product';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  addProduct(product: Product): Observable<Product>{
    this.setToken();
    return this.http.post<Product>(environment.apiUrl + '/product', product, this.httpOptions);
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  updateProduct(product: Product): Observable<Product>{
    this.setToken();
    return this.http.put<Product>(environment.apiUrl + '/product/' + product.id, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product>{
    this.setToken();
    return this.http.delete<Product>(environment.apiUrl + '/product/' + id, this.httpOptions);
  }

  setToken(): void{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
