import { Component, OnInit } from '@angular/core';
import {Color} from '../shared/Color';
import {ColorService} from '../shared/color.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  colors: Color[];
  loading: boolean = true;

  constructor(private colorService: ColorService, private router: Router ) { }
  ngOnInit(): void {
    this.getColors();
  }

  getColors(): void{
    this.colorService.getColors().subscribe((colors) => {this.colors = colors;}, error => {}, () => {this.loading = false;});
  }

  deleteColor(id: number): void{
    this.colorService.deleteColor(id).subscribe((color) => this.getColors(),
      error => {if (error.status === 401){this.router.navigate(['/login']);}});
  }

}
