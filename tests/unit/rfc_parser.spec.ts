import { DateTime } from 'luxon';
import RfcParser from '#src/rfc_parser';

describe('rfc parser', () => {
  test('parse persona fisica', () => {
    const parser = RfcParser.parse('COSC8001137NA');

    expect(parser.getName()).toBe('COSC');
    expect(parser.getYear()).toBe(80);
    expect(parser.getMonth()).toBe(1);
    expect(parser.getDay()).toBe(13);
    expect(parser.getHKey()).toBe('7N');
    expect(parser.getChecksum()).toBe('A');
    expect(parser.getDate()).toStrictEqual(DateTime.fromISO('2080-01-13'));
  });

  test('parse persona moral', () => {
    const parser = RfcParser.parse('AAA99123103A');

    expect(parser.getName()).toBe('AAA');
    expect(parser.getYear()).toBe(99);
    expect(parser.getMonth()).toBe(12);
    expect(parser.getDay()).toBe(31);
    expect(parser.getHKey()).toBe('03');
    expect(parser.getChecksum()).toBe('A');
    expect(parser.getDate()).toStrictEqual(DateTime.fromISO('2099-12-31'));
  });

  test('parse using lower case', () => {
    const parser = RfcParser.parse('cosc8001137na');

    expect(parser.getName()).toBe('COSC');
    expect(parser.getHKey()).toBe('7N');
    expect(parser.getChecksum()).toBe('A');
  });

  test('parse using multibyte', () => {
    const parser = RfcParser.parse('ÑÑÑÑ000101AAA');

    expect(parser.getName()).toBe('ÑÑÑÑ');
  });

  test('parse using leap year', () => {
    const parser = RfcParser.parse('AAAA000229AAA');

    expect(parser.getYear()).toBe(0);
    expect(parser.getMonth()).toBe(2);
    expect(parser.getDay()).toBe(29);
  });

  test.each([[''], ['AAA-010101AAA'], ['ÁAAA010101AAA'], ['AAAA010101AA'], ['AA010101AAA']])(
    'parse using invalid expressions %s',
    (value) => {
      expect(() => RfcParser.parse(value)).toThrow('valid parts');
    },
  );

  test.each([['AAAA010229AAA'], ['AAAA010132AAA']])('parse_using_invalid_dates %s', (value) => {
    expect(() => RfcParser.parse(value)).toThrow('date');
  });
});
