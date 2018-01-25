export interface PurchaseParams {
  eventId: string;
  userId: string;
  isDisabled?: boolean
}

export interface PurchaseResponce {
  message: string;
  isAlreadyExist: boolean
}
