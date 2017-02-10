import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fan-bio-tab',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})

export class BiographyComponent {
  @Input()
  public currentUser: any;
}
