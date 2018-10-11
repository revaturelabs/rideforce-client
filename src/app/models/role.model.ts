/** Represents the type of user in the system */
export enum Role {
    /** A Regular User that is offering rides */
    Driver = 'DRIVER',
    /** A Regular user that might be looking for rides */
    Rider = 'RIDER',
    /** Represents a trainer */
    Trainer = 'TRAINER',
    /** The super user of te system */
    Admin = 'ADMIN',
  }
