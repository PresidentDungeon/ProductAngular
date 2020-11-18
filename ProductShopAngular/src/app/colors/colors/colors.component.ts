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

  colorsTest: Color[];
  loadingTest: boolean = false;

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallnumPages: number = 0;

  pageChanged($event: any): void {
    if($event.page !== this.currentPage){
      this.currentPage = $event.page;
      console.log($event);
      this.getColorsTest();
    }
  }

  constructor(private colorService: ColorService, private router: Router ) { }
  ngOnInit(): void {
    this.getColors();
    this.getColorsTest();
  }

  getColors(): void{
    this.colorService.getColors().subscribe((colors) => {this.colors = colors;}, error => {}, () => {this.loading = false;});
  }

  itemsPrPageUpdate(): void{
    this.smallnumPages = Math.ceil(this.totalItems/this.itemsPrPage);
    this.currentPage = 1;
    this.getColorsTest();
  }

  getColorsTest(): void{
    let filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}`;
    this.loadingTest = true;

    this.colorService.getColorsTest(filter).subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.colorsTest = FilterList.list;
      }, error => {}, () => {this.loadingTest = false;});
  }

  deleteColor(id: number): void{
    this.colorService.deleteColor(id).subscribe((color) => this.getColors(),
      error => {if (error.status === 401){this.router.navigate(['/login']);}});
  }

}
