import { User } from './user.model';

/** Represents a User object that could be hidden in an HTML list */
export class SwipecardModel {
    /** The Given User */
    user: User;
    /** Is is visible or hidden? */
    visible = false;
}
