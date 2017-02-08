import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists-component',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})

export class ArtistsComponent {
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public goTo(): void {
    this.router.navigate(['artist-profile']);
  }
}
