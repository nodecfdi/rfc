import InvalidExpressionToParseError from '#src/errors/invalid_expression_to_parse_error';

describe('invalid expression to parse error', () => {
  test('error invalid parts', () => {
    const value = 'foo';
    const exception = InvalidExpressionToParseError.invalidParts(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getRfc()).toBe(value);
    expect(exception.message).toContain('valid parts');
  });

  test('error greater than maximum', () => {
    const value = 'foo';
    const exception = InvalidExpressionToParseError.invalidDate(value);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.getRfc()).toBe(value);
    expect(exception.message).toContain('valid date');
  });
});
