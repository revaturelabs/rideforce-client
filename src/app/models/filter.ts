/**
 * Provides a list of possible filters set up for the matching service
 */
export class Filter {
    /** Filter by the user's batch end date */
    batchEndChange: boolean;
    /** Filter by the day the user started */
    dayStartChange: boolean;
    /** Filter by the distance between the users */
    distanceChange: boolean;
}
