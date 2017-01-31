import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { LoginService } from './login.modal.service';
import { ModalDirective } from 'ng2-bootstrap';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.component.html',
  styleUrls: ['./login.modal.component.css']
})
export class LoginModalComponent {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public userPassword: string;
  public userEmail: string;
  public userErrorMessage: string;

  public loginService: LoginService;
  public loginServiceSubscribe: Subscription;

  private auth: AuthService;

  public constructor(loginService: LoginService,
                     auth: AuthService) {
    this.loginService = loginService;
    this.auth = auth;
  }

  public closeModal(): void {
    this.staticModal.hide();
    this.userEmail = '';
    this.userPassword = '';
    this.userErrorMessage = '';
  }

  public submitData(email, password): void {
    const loginData = {email: email, pwd: password};

    this.loginServiceSubscribe = this.loginService.loginUser(loginData)
      .subscribe((res: any): void => {
        const userData: any = res;

        if (userData.err) {
          this.userPassword = '';
          this.userErrorMessage = userData.err;
          return;
        }

        this.closeModal();
      });
  }
}
