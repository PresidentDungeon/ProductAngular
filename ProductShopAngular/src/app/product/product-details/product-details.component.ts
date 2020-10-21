import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {ProductsService} from '../../shared/services/products.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {Product} from "../../shared/models/Product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers:[DatePipe]
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  found: boolean = true;
  loading: boolean = true;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    date: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductsService, private route: ActivatedRoute, private location: Location, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getProduct();
  }

  initialText(): void{
    if (this.product != null){
      this.productForm.patchValue({
        name: this.product.name,
        type: this.product.type,
        price: this.product.price,
        date: this.datePipe.transform(this.product.createdDate, 'yyyy-MM-ddTHH:mm')
      });
    }
  }

  getProduct(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe(
      (product) => {this.product = product; this.initialText();},
      (er) => { this.found = false; this.loading = false;},
      () => {this.loading = false;});
  }

  goBack(): void{
    this.location.back();
  }

  updateProduct(): void{
    const productData = this.productForm.value;
    this.product.name = productData.name;
    this.product.type = productData.type;
    this.product.price = productData.price;

    let dateString = productData.date;
    let date = new Date(dateString);
    date.setTime(date.getTime() + 2*60*60*1000);

    this.product.createdDate = new Date(date);

    this.productService.updateProduct(this.product).subscribe(product => this.getProduct());
  }

}
