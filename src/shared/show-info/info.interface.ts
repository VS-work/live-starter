import { Show } from '../../event-launch/event-launch.model';
import { User } from '../../user-service/user.model';

export interface ShowInfo {
  isEvent?: boolean;
  show: Show;
  user?: User
}
