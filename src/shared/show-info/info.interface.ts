import { Show } from '../show-service/show.model';
import { User } from '../../user-service/user.model';

export interface ShowInfo {
  isEvent?: boolean;
  show: Show;
  user?: User
}
