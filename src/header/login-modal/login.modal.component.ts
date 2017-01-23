import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {LoginService} from './login.modal.service';
import {ModalDirective} from 'ng2-bootstrap';

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

	public userLoggedIn: boolean = false;
	public userName: string;

	public loginService: LoginService;
	public loginServiceSubscribe: Subscription;

	@Output('user')
	public user: EventEmitter<any> = new EventEmitter<any>();

	public constructor(loginService: LoginService) {
		this.loginService = loginService;
	}

	public closeModal(): void {
		this.staticModal.hide();
		this.userEmail = '';
		this.userPassword = '';
		this.userErrorMessage = '';
	}

	public socialLogin(socialType): void {
		console.log('Login via ', socialType);
		this.closeModal();
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

				if (userData.data) {
						this.user.emit(userData.data);
				}

				this.closeModal();
			});
	}
}
