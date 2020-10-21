import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = 'https://localhost:44320/api/product';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productUrl, product, this.httpOptions);
  }

  getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(this.productUrl + '/' + id);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.productUrl + '/' + product.id, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(this.productUrl + '/' + id, this.httpOptions);
  }
}
