import { Component, OnInit } from '@angular/core';
import {Product} from "../shared/Product";
import {ProductsService} from "../shared/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  loading: boolean = true;

  constructor(private productService: ProductsService ) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
  this.productService.getProducts().subscribe((products) => {this.products = products;}, error => {}, () => {this.loading = false;});
  }

  deleteProduct(id: number): void{
    this.productService.deleteProduct(id).subscribe((product) => this.getProducts());
  }

}
