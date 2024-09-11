export default class InvalidExpressionToParseError extends Error {
  private readonly rfc: string;

  private constructor(message: string, rfc: string) {
    super(message);
    this.rfc = rfc;
  }

  public static invalidParts(rfc: string): InvalidExpressionToParseError {
    return new InvalidExpressionToParseError(
      'The RFC expression does not contain the valid parts',
      rfc,
    );
  }

  public static invalidDate(rfc: string): InvalidExpressionToParseError {
    return new InvalidExpressionToParseError(
      'The RFC expression does not contain a valid date',
      rfc,
    );
  }

  public getRfc(): string {
    return this.rfc;
  }
}
