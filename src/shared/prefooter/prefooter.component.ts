import { Component } from '@angular/core';

import { AuthService } from '../../auth0/auth.service';

@Component({
  selector: 'app-prefooter',
  templateUrl: './prefooter.component.html',
  styleUrls: ['./prefooter.component.scss']
})

export class PrefooterComponent {
  constructor(private authService: AuthService) {
  }

  signUp(): void {
    this.authService.showSignUpModal();
  };
}

