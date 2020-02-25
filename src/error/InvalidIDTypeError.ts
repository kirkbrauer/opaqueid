/**
 * The invalid ID type error.
 */
export default class InvalidIDTypeError extends Error {
  /**
   * The expected ID type.
   */
  public expectedType: string;

  /**
   * The actual ID type.
   */
  public actualType: string;

  /**
   * Constructs a new InvalidIDTypeError
   * @param expectedType The expected ID type.
   * @param actualType The actual cursor type.
   */
  constructor(expectedType: string, actualType: string) {
    super(`Expected ${expectedType} ID, got ${actualType} ID`);
    this.name = 'Invalid ID Type Error';
    this.expectedType = expectedType;
    this.actualType = actualType;
  }
}
