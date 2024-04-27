import { RfcIntConverter } from '#src/rfc_int_converter';

describe('rfc int converter', () => {
  let converter: RfcIntConverter;

  beforeAll(() => {
    converter = new RfcIntConverter();
  });

  test('converter zero to string', () => {
    const converted = converter.intToString(0);

    expect(converted).toBe('AAA000101000');
  });

  test('converter max integer to string', () => {
    const converted = converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE);

    expect(converted).toBe('ÑÑÑÑ991231ZZA');
  });

  test('converter string to zero', () => {
    const converted = converter.stringToInt('AAA000101000');

    expect(converted).toBe(0);
  });

  test('converter string to max integer', () => {
    const converted = converter.stringToInt('ÑÑÑÑ991231ZZA');

    expect(converted).toBe(RfcIntConverter.MAX_INTEGER_VALUE);
  });

  test.each([
    [40_270_344_269_627, 'COSC8001137NA'],
    [1_348_025_748_541, 'DIM8701081LA'],
  ])('known values %s - %s', (inputSerial: number, inputRfc: string) => {
    expect(converter.intToString(inputSerial)).toBe(inputRfc);
    expect(converter.stringToInt(inputRfc)).toBe(inputSerial);
  });

  test('throw error using integer lower than zero', () => {
    expect(() => converter.intToString(-1)).toThrow(Error);
    expect(() => converter.intToString(-1)).toThrow('lower than zero');
  });

  test('throw error using integer greater than maximum', () => {
    expect(() => converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE + 1)).toThrow(Error);
    expect(() => converter.intToString(RfcIntConverter.MAX_INTEGER_VALUE + 1)).toThrow(
      'greater than maximum',
    );
  });

  test('rfc persona moral persona fisica bounds', () => {
    expect(RfcIntConverter.FISICA_LOWER_BOUND).toBe(RfcIntConverter.MORAL_UPPER_BOUND + 1);
    expect(RfcIntConverter.MAX_INTEGER_VALUE).toBe(RfcIntConverter.FISICA_UPPER_BOUND);
  });
});
