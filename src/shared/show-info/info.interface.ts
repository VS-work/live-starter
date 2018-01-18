import { Show } from '../../event-launch/event-launch.model';
import { User } from '../../signup/user.class';

export interface ShowInfo {
  isEvent?: boolean;
  show: Show;
  user?: User
}
