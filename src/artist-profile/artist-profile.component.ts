import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-profile-component',

  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})

export class ArtistProfileComponent implements OnInit {
  public radioModel: string;

  public constructor() {
  }

  public ngOnInit(): void {
    this.radioModel = 'permonth';
  }
}
