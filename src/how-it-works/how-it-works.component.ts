import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works-component',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})

export class HowItWorksComponent implements OnInit {
  public forArtists: boolean;

  ngOnInit(): void {
    this.forArtists = false;
  }

  public goToArtists(): void {
    this.forArtists = !this.forArtists;
  }
}
