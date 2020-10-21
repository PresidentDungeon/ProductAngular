import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/models/Product";
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductsService ) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
  this.productService.getProducts().subscribe((products) => this.products = products);
  }

  deleteProduct(id: number): void{
    this.productService.deleteProduct(id).subscribe((product) => this.getProducts());
  }

}
