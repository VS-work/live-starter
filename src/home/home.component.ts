import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public currentUser: any = {};

  public constructor() {

  }

  // public getUser(options: any): void {
  //   this.currentUser = options;
  //   console.log(typeof this.currentUser);
  // }
}
