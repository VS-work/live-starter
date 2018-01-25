import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PurchaseParams } from './purchase-container.interface';
import { PurchaseContainerService } from './purchase-container.service';

import { ToastOptions, ToastyService } from 'ng2-toasty';
import { customToastOptions } from '../models/toasty-options.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase-container.component.html',
  styleUrls: []
})
export class PurchaseContainerComponent {
  @Input() purchaseParams: PurchaseParams;
  @Input() isFree = false;
  @Output() isBought: EventEmitter<boolean> = new EventEmitter();

  constructor(private purchaseContainerService: PurchaseContainerService, private toastyService: ToastyService) {

  }

  getFreeTicket(): void | undefined {
    if (!this.purchaseParams.eventId || !this.purchaseParams.userId) {
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
        this.isBought.emit(false);
      }, err => {
        console.error('something went wrong', err);
      });
  }
}
