import {Component, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {SignUpService} from './signup.modal.service';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
	selector: 'app-signup-modal',
	templateUrl: '././signup.modal.component.html',
	styleUrls: ['./signup.modal.component.css']
})
export class SignUpModalComponent {
	@ViewChild('staticModal') public staticModal: ModalDirective;

	public signupForm: any = {};
	public userErrorMessage: string;

	public signupService: SignUpService;
	public signupServiceSubscribe: Subscription;

	public constructor(signupService: SignUpService) {
		this.signupService = signupService;
	}

	public closeModal(): void {
		this.staticModal.hide();
		this.userErrorMessage = '';
		this.signupForm = {};
	}

	public submitData(newUser): void {
		const signupData = newUser;

		this.signupServiceSubscribe = this.signupService.signupUser(signupData)
			.subscribe((res: any): void => {
				const userData: any = res.data;

				console.log(userData);

				if (userData.error) {
					this.signupForm.userPassword = '';
					this.signupForm.userPasswordConfirm = '';
					this.userErrorMessage = userData.error;
					return;
				}
				this.staticModal.hide();
				this.signupForm = {};
				this.userErrorMessage = '';
			});
	}
}
