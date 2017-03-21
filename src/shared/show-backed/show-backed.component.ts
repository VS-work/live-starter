import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-backed',
  templateUrl: './show-backed.component.html',
  styleUrls: ['./show-backed.component.css']
})

export class ShowsBackedComponent {
  @Input()
  public currentUser: any;
}
