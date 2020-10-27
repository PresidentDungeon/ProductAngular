import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {ProductsService} from '../shared/products.service';
import {FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Product} from '../shared/Product';
import {Type} from '../../types/shared/Type';
import {TypesService} from '../../types/shared/types.service';
import {Color} from '../../colors/shared/Color';
import {ColorService} from '../../colors/shared/color.service';
import {ProductColors} from '../../colors/shared/ProductColors';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers:[DatePipe]
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  types: Type[];
  colors: Color[];
  found: boolean = true;
  loading: boolean = true;
  userRole: string;
  error: string = '';

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    color: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductsService, private typeService: TypesService,
              private colorService: ColorService, private authService: AuthenticationService,
              private route: ActivatedRoute, private location: Location,
              private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getTypes();
    this.getColors();
    this.getProduct();
    this.userRole = this.authService.getRole();
  }

  initialText(): void{
    if (this.product != null){

      let colors: string[] = [];

      for(let color of this.product.productColors){
        colors.push(color['colorID']);
      }


      this.productForm.patchValue({
        name: this.product.name,
        type: this.product.type.id,
        price: this.product.price,
        date: this.datePipe.transform(this.product.createdDate, 'yyyy-MM-ddTHH:mm'),
        color: colors
      });

      this.loading = false;
    }

  }

  getProduct(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe(
      (product) => {this.product = product; this.initialText();},
      (er) => { this.found = false;});
  }

  getTypes(): void{
    this.typeService.getTypes().subscribe((types) => this.types = types);
  }

  getColors(): void{
    this.colorService.getColors().subscribe((colors) => {this.colors = colors});
  }

  goBack(): void{
    this.location.back();
  }

  updateProduct(): void{
    const productData = this.productForm.value;

    let productColor: ProductColors[] = [];
    for(let c of productData.color){
      productColor.push({ColorID: c, Color: null})
    }

    this.product.name = productData.name;
    this.product.type.id = productData.type;
    this.product.price = productData.price;

    let dateString = productData.date;
    let date = new Date(dateString);
    date.setTime(date.getTime() + 2*60*60*1000);

    this.product.createdDate = new Date(date);

    this.product.productColors = productColor;

    this.productService.updateProduct(this.product).subscribe(product => this.getProduct(),
      error => {this.error = error.error;
        if(error.status === 401){this.router.navigate(['/login']);}
      });
  }

}
