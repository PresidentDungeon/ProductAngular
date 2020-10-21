import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import {ProductsService} from "../../shared/services/products.service";
import {Product} from "../../shared/models/Product";
import {Type} from "../../shared/models/Type";
import {TypesService} from "../../shared/services/types.service";

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

  types: Type[];

  constructor(private productService: ProductsService, private typeService: TypesService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getTypes();
    this.initialText();
  }

  goBack(): void{
    this.location.back();
  }

  getTypes(): void{
    this.typeService.getTypes().subscribe((types) => this.types = types);
  }

  createProduct(): void{
    const productData = this.productForm.value;
    let date = new Date();
    date.setTime(date.getTime() + 2*60*60*1000);

    const product: Product = {
      id: 0,
      name: productData.name,
      type: {id: productData.type, name: ''},
      price: productData.price,
      createdDate: new Date(date)

    };

    this.productService.addProduct(product).subscribe(p => this.goBack());
  }

  initialText(): void{
      this.productForm.patchValue({
        type: ""
      });
    }

}
