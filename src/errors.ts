export class InvalidExpressionToParseError extends Error {
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

export class InvalidIntegerToConvertError extends Error {
  private readonly value: number;

  private constructor(message: string, value: number) {
    super(message);
    this.value = value;
  }

  public static lowerThanZero(value: number): InvalidIntegerToConvertError {
    return new InvalidIntegerToConvertError('The integer serial number is lower than zero', value);
  }

  public static greaterThanMaximum(value: number): InvalidIntegerToConvertError {
    return new InvalidIntegerToConvertError(
      'The integer serial number is greater than maximum value',
      value,
    );
  }

  public getValue(): number {
    return this.value;
  }
}
