import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-music-tab',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})

export class MusicComponent {
  @Input()
  public currentUser: any;
}

