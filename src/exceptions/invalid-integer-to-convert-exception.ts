export class InvalidIntegerToConvertException extends Error {
  private readonly value: number;

  private constructor(message: string, value: number) {
    super(message);
    this.value = value;
  }

  public static lowerThanZero(value: number): InvalidIntegerToConvertException {
    return new InvalidIntegerToConvertException(
      'The integer serial number is lower than zero',
      value,
    );
  }

  public static greaterThanMaximum(value: number): InvalidIntegerToConvertException {
    return new InvalidIntegerToConvertException(
      'The integer serial number is greater than maximum value',
      value,
    );
  }

  public getValue(): number {
    return this.value;
  }
}
