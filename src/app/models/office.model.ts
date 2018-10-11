/** Represents Offices a User might hold */
export interface Office {

  /**
   * The ID of the office in the database.
   */
  id: number;
  /**
   * The common name of the office (e.g. "Reston").
   */
  name: string;
  /** Where the office is located */
  address: string;

}
