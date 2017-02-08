import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shows-tab',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})

export class ShowsComponent {
  @Input('showType')
  public showType: string;

}
