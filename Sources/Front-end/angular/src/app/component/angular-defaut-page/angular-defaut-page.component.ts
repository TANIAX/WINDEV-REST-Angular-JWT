import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-defaut-page',
  templateUrl: './angular-defaut-page.component.html',
  styleUrls: ['./angular-defaut-page.component.scss']
})
export class AngularDefautPageComponent implements OnInit {
    title : string = "";
  constructor() { 
    this.title = 'angular';
  }

  ngOnInit(): void {
  }

}
