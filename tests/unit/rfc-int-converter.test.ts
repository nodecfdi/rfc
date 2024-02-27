import { RfcIntConverter } from 'src/rfc-int-converter';

describe('RfcIntConverter', () => {
  let converter: RfcIntConverter;

  beforeAll(() => {
    converter = new RfcIntConverter();
  });

  test('converter_zero_to_string', () => {
    const converted = converter.intToString(0);
    expect(converted).toBe('AAA000101000');
  });

  test('converter_max_integer_to_string', () => {
    const converted = converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE);
    expect(converted).toBe('ÑÑÑÑ991231ZZA');
  });

  test('converter_string_to_zero', () => {
    const converted = converter.stringToInt('AAA000101000');
    expect(converted).toBe(0);
  });

  test('converter_string_to_max_integer', () => {
    const converted = converter.stringToInt('ÑÑÑÑ991231ZZA');
    expect(converted).toBe(RfcIntConverter.MAX_INTEGER_VALUE);
  });

  test.each([
    [40_270_344_269_627, 'COSC8001137NA'],
    [1_348_025_748_541, 'DIM8701081LA'],
  ])('known_values %s - %s', (inputSerial: number, inputRfc: string) => {
    expect(converter.intToString(inputSerial)).toBe(inputRfc);
    expect(converter.stringToInt(inputRfc)).toBe(inputSerial);
  });

  test('throw_exception_using_integer_lower_than_zero', () => {
    expect(() => converter.intToString(-1)).toThrow(Error);
    expect(() => converter.intToString(-1)).toThrow('lower than zero');
  });

  test('throw_exception_using_integer_greater_than_maximum', () => {
    expect(() => converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE + 1)).toThrow(Error);
    expect(() => converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE + 1)).toThrow(
      'greater than maximum',
    );
  });

  test('rfc_persona_moral_persona_fisica_bounds', () => {
    expect(RfcIntConverter.FISICA_LOWER_BOUND).toBe(RfcIntConverter.MORAL_UPPER_BOUND + 1);
    expect(RfcIntConverter.MAX_INTEGER_VALUE).toBe(RfcIntConverter.FISICA_UPPER_BOUND);
  });
});
