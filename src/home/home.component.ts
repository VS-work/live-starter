import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WindowRefService } from '../shared';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private router: Router;
  private winRef: any;

  public constructor(router: Router,
                    winRef: WindowRefService) {
    this.router = router;
    this.winRef = winRef;
  }

  public ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.winRef.nativeWindow.scrollTo(0, 0);
    });
  }
}
