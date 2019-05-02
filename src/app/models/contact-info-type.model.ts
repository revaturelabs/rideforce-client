/** Represents the type of contact information available for a user */
export enum ContactInfoType {
    /** The phone number */
    Phone = 'PHONE',
    /** A Slack account */
    Slack = 'SLACK',
    /** A Skype account */
    Skype = 'SKYPE',
    /** A Venmo account */
    Venmo = 'VENMO',
    /** A Discord account */
    Discord = 'DISCORD',
    /** A GroupMe account */
    GroupMe = 'GROUPME',
    /** An Email account */
    Email = 'EMAIL',
    /** A Facebook account */
    Facebook = 'Facebook',
    /** Other types of contact info */
    Other = 'OTHER',
}
