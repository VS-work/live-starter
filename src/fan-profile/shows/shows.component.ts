import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fan-shows-tab',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})

export class ShowsComponent {
  @Input()
  public showType: string;

  @Input()
  public currentUser: any;
}
