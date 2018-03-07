export interface PurchaseResponce {
  message: string;
  isAlreadyExist: boolean
}

export class PurchaseParamsModel {
  eventId: string;
  userId: string;
  isDisabled: boolean;

  constructor(eventId: string, userId: string, isDisabled = false ) {
    this.eventId = eventId;
    this.userId = userId;
    this.isDisabled = isDisabled;
  }
}
