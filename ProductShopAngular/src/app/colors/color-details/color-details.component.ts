import { Component, OnInit } from '@angular/core';
import {Color} from '../shared/Color';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '../shared/color.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-color-details',
  templateUrl: './color-details.component.html',
  styleUrls: ['./color-details.component.css']
})
export class ColorDetailsComponent implements OnInit {

  color: Color;
  found: boolean = true;
  loading: boolean = true;
  userRole: string;
  error: string = '';

  colorForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  constructor(private colorService: ColorService, private authService: AuthenticationService,
              private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getColor();
    this.userRole = this.authService.getRole();
  }

  initialText(): void{
    if (this.color != null){

      this.colorForm.patchValue({
        description: this.color.colorDescription
      });

      this.loading = false;
    }
  }

  getColor(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.colorService.getColorById(id).subscribe(
      (color) => {this.color = color; this.initialText();},
      (error) => { this.found = false;});
  }

  goBack(): void{
    this.location.back();
  }

  updateColor(): void{
    const colorData = this.colorForm.value;

    this.color.colorDescription = colorData.description;

    this.colorService.updateColor(this.color).subscribe(color => this.getColor(),
      error => {this.error = error.error;
        if(error.status === 401){this.router.navigate(['/login']);}
      });
  }

}
