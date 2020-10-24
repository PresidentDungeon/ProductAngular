import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void{
    (document.getElementById('phone') as HTMLImageElement).src = '/assets/images/Phones.jpg';
    (document.getElementById('tool') as HTMLImageElement).src = '/assets/images/Tools.jpg';
    (document.getElementById('food') as HTMLImageElement).src = '/assets/images/Food.jpg';
    (document.getElementById('barista') as HTMLImageElement).src = '/assets/images/Barista.jpg';
  }

}
