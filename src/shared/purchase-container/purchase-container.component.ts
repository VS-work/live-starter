import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { PurchaseParamsModel } from './purchase-container.model';
import { PurchaseContainerService } from './purchase-container.service';
import { customToastOptions } from '../models/toasty-options.model';
import { AuthService } from '../../auth0/auth.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase-container.component.html',
  styleUrls: ['./purchase-container.component.scss']
})
export class PurchaseContainerComponent {
  @Input() purchaseParams: PurchaseParamsModel;
  @Input() isFree = false;
  @Output() isBought: EventEmitter<boolean> = new EventEmitter();

  constructor(private purchaseContainerService: PurchaseContainerService,
              private toastyService: ToastyService,
              private auth: AuthService) {

  }

  getFreeTicket(): void | undefined {
    if (!this.purchaseParams.userId) {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{
          title: 'Info',
          msg: 'You are not authorized to perform this command'
        }
      };
      this.toastyService.error(toastOptions);
      this.auth.showAuthModal();
      return undefined;
    }

    if (!this.purchaseParams.eventId) {
      return undefined;
    }

    this.purchaseContainerService.getFreeTicket(this.purchaseParams)
      .subscribe(res => {
        const toastOptions: ToastOptions = {
          ...customToastOptions,
          ...{
            title: res.isAlreadyExist ? 'Info' : 'Success',
            msg: res.message
          }
        };

        if (!res.isAlreadyExist) {
          this.toastyService.success(toastOptions);
          this.isBought.emit(true);

          return undefined;
        }

        this.toastyService.info(toastOptions);
      }, err => {
        console.error('something went wrong', err);
      });
  }
}
