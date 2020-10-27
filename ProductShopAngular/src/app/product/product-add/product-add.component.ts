import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import {ProductsService} from '../shared/products.service';
import {Product} from '../shared/Product';
import {Type} from '../../types/shared/Type';
import {TypesService} from '../../types/shared/types.service';
import {ColorService} from '../../colors/shared/color.service';
import {Color} from '../../colors/shared/Color';
import {ProductColors} from '../../colors/shared/ProductColors';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    color: new FormControl('', [Validators.required])
  });

  types: Type[];
  colors: Color[];
  loading: boolean = true;

  constructor(private productService: ProductsService, private typeService: TypesService,
              private route: ActivatedRoute, private location: Location,
              private router: Router, private colorService: ColorService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getColors();
  }

  goBack(): void{
    this.location.back();
  }

  getTypes(): void{
    this.typeService.getTypes().subscribe((types) => this.types = types);
  }

  getColors(): void{
    this.colorService.getColors().subscribe((colors) => {this.colors = colors; this.initialText();},error => {}, () => {this.loading = false;});
  }

  createProduct(): void{
    const productData = this.productForm.value;
    let date = new Date();
    date.setTime(date.getTime() + 2*60*60*1000);

    let productColor: ProductColors[] = [];
    for(let c of productData.color){
      productColor.push({ColorID: c, Color: null});
    }
    const product: Product = {
      id: 0,
      name: productData.name,
      type: {id: productData.type, name: ''},
      price: productData.price,
      createdDate: new Date(date),
      productColors: productColor
    };
    this.productService.addProduct(product).subscribe(p => this.goBack(),
        error => {if(error.errorCode === 401){this.router.navigate(['/login']);}});
  }

  initialText(): void{
      this.productForm.patchValue({
        type: ""
      });
    }

}
