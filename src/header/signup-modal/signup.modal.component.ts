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

	public firstStepSuccess: boolean = false;
	public isTypeArtist: boolean = false;

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

	public backToFisrtStep(): void {
		this.firstStepSuccess = !this.firstStepSuccess;
	}

	public isUserArtist(type: boolean): void {
		this.isTypeArtist = type;
	}

	public socialLogin(socialType): void {
		console.log('Login via ', socialType);
		this.closeModal();
	}

	public submitData(newUser): void {
		this.firstStepSuccess = true;

		const signupData = {email: newUser.email,
												type: newUser.type,
												password: newUser.password};

		if (newUser.password !== newUser.passwordConfirm) {
			this.userErrorMessage = 'Confirmed password does not match password.';
			return;
		}

		this.signupServiceSubscribe = this.signupService.signupUser(signupData)
			.subscribe((res: any): void => {
				const userData: any = res.data;

				console.log(userData);

				if (userData.error) {
					this.signupForm.password = '';
					this.signupForm.passwordConfirm = '';
					this.userErrorMessage = userData.error;
					return;
				}
				this.staticModal.hide();
				this.signupForm = {};
				this.userErrorMessage = '';
				this.firstStepSuccess = true;
			});
	}
}
