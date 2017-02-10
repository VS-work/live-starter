import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeaturedArtistsService } from './featured-artists.service';

@Component({
  selector: 'app-featured-artists',
  templateUrl: './featured-artists.component.html',
  styleUrls: ['./featured-artists.component.css']
})
export class FeaturedArtistsComponent implements OnInit {
  public artist: any;
  public featuredArtistsService: FeaturedArtistsService;
  public featuredArtistsServiceSubscribe: Subscription;
  public router: Router;

  public constructor(router: Router,
                     featuredArtistsService: FeaturedArtistsService) {
    this.router = router;
    this.featuredArtistsService = featuredArtistsService;
  }

  public ngOnInit(): void {
    this.featuredArtistsServiceSubscribe = this.featuredArtistsService.getFeaturedArtits()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        const user: any[] = res.data;
        this.artist = user;
      });
  }

  public goToArtistPage(artistName: string): void {
    if (artistName !== this.artist.username) {
      return;
    }

    if (artistName === this.artist.username) {
      this.router.navigate(['artist-profile']);
    }
  }
}
