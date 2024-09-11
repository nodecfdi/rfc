import InvalidIntegerToConverterError from '#src/errors/invalid_integer_to_converter_error';

describe('invalid integer to converter error', () => {
  test('error lower than zero', () => {
    const value = -1;
    const exception = InvalidIntegerToConverterError.lowerThanZero(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getValue()).toBe(value);
    expect(exception.message).toContain('lower than zero');
  });

  test('error greater than maximum', () => {
    const value = -1;
    const exception = InvalidIntegerToConverterError.greaterThanMaximum(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getValue()).toBe(value);
    expect(exception.message).toContain('greater than maximum');
  });
});
