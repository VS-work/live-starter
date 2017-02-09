import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public currentUser: any = {};

  public getUser(options: any): void {
    this.currentUser = options;
  }
}
