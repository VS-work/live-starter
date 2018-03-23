import { ChangableData } from '../my-profile/changable-data.model';
import { Notifications } from '../my-profile/notification.model';

export interface UpdateUserProfileRequestObject {
  id: string;
  updatedData: ChangableData | Notifications;
};

export interface UpdateUserProfileResponseObject {
  message: string;
};
