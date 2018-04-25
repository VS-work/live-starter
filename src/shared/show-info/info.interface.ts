import { Show } from '../show-service/show.model';
import { User } from '../services/user-service';

export interface ShowInfo {
  isEvent?: boolean;
  show: Show;
  user?: User
}
