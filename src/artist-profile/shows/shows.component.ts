import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shows-tab',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})

export class ShowsComponent implements OnInit {
  @Input('showType')
  public showType: string;

  public constructor() {
  }

  ngOnInit(): void {
  }
}
