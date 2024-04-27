import { InvalidIntegerToConvertError } from '#src/errors';

describe('invalid integer to convert exception', () => {
  test('error lower than zero', () => {
    const value = -1;
    const exception = InvalidIntegerToConvertError.lowerThanZero(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getValue()).toBe(value);
    expect(exception.message).toContain('lower than zero');
  });

  test('error greater than maximum', () => {
    const value = -1;
    const exception = InvalidIntegerToConvertError.greaterThanMaximum(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getValue()).toBe(value);
    expect(exception.message).toContain('greater than maximum');
  });
});
