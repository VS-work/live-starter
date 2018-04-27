import { Show } from '../services/show-management-service/show.model';
import { User } from '../services/user-management-service';

export interface ShowInfo {
  isEvent?: boolean;
  show: Show;
  user?: User
}
