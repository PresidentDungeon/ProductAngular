import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Color} from '../shared/Color';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ColorService} from '../shared/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorForm = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  error: string = '';

  constructor(private colorService: ColorService, private location: Location,
              private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.location.back();
  }

  createColor(): void{
    const productData = this.colorForm.value;

    const color: Color = {
      id: 0,
      colorDescription: productData.description
    };

    this.colorService.addColor(color).subscribe(p => this.goBack(),
      error => {this.error = error.error;
        if(error.status === 401){this.router.navigate(['/login']);}
      });
  }

}
