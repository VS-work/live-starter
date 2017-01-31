import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Config } from '../../app.config';

@Component({
  selector: 'app-prefooter',
  templateUrl: './prefooter.component.html',
  styleUrls: ['./prefooter.component.css']
})
export class PrefooterComponent implements OnInit {
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  public scrollTop(e: MouseEvent): void {
    e.preventDefault();

    Config.animateScroll('scrollBackToTop', 20, 1000);

    this.router.navigate(['/first-step']);
  };
}
