import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-recorded',
  templateUrl: './show-recorded.component.html',
  styleUrls: ['./show-recorded.component.css']
})

export class ShowsRecordedComponent {
  @Input()
  public currentUser: any;
}
