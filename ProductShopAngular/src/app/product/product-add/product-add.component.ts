import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import {ProductsService} from "../../shared/services/products.service";
import {Product} from "../../shared/models/Product";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)])
  });

  constructor(private productService: ProductsService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.location.back();
  }

  createProduct(): void{
    const productData = this.productForm.value;
    const product: Product = {
      id: 0,
      name: productData.name,
      type: productData.type,
      price: productData.price,
      createdDate: new Date()
    };

    this.productService.addProduct(product).subscribe(p => this.goBack());
  }

}
