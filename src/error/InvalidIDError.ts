/**
 * The invalid ID error.
 */
export default class InvalidIDError extends Error {
  /**
   * The ID type.
   */
  public type?: string;

  /**
   * Constructs a new InvalidIDError
   * @param type The ID type.
   */
  constructor(type?: string) {
    super(type ? `Invalid ${type} ID` : 'Invalid ID');
    this.name = 'Invalid ID Error';
  }
}
