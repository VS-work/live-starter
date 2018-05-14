import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth0/auth.service';
import { RouterLinks } from '../../enums/router-links.emum';

@Component({
  selector: 'app-prefooter',
  templateUrl: './prefooter.component.html',
  styleUrls: ['./prefooter.component.scss']
})

export class PrefooterComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  signUp(): void {
    this.authService.showSignUpModal();
  };

  learnMore(): void {
    this.router.navigate([RouterLinks.HowItWorks]);
  }
}

