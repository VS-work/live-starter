import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-tip',
  templateUrl: './show-tip.component.html',
  styleUrls: ['./show-tip.component.css']
})

export class ShowsTipComponent {
  @Input()
  public currentUser: any;
}
