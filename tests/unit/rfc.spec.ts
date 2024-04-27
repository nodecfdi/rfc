import { DateTime } from 'luxon';
import { Rfc } from '#src/rfc';

describe('rfc', () => {
  test('create rfc persona fisica', () => {
    const input = 'COSC8001137NA';
    const rfc = Rfc.unparsed(input);

    expect(rfc.getRfc()).toBe(input);
    expect(`${rfc}`).toBe(input);
    expect(rfc.isGeneric()).toBeFalsy();
    expect(rfc.isForeign()).toBeFalsy();
    expect(rfc.isMoral()).toBeFalsy();
    expect(rfc.isFisica()).toBeTruthy();
    expect(rfc.calculateChecksum()).toBe('A');
    expect(rfc.doesCheckSumMatch()).toBeTruthy();
    expect(rfc.calculateSerial()).toBe(40_270_344_269_627);
  });

  test('create rfc moral', () => {
    const input = 'DIM8701081LA';
    const rfc = Rfc.unparsed(input);

    expect(rfc.getRfc()).toBe(input);
    expect(`${rfc}`).toBe(input);
    expect(rfc.isGeneric()).toBeFalsy();
    expect(rfc.isForeign()).toBeFalsy();
    expect(rfc.isMoral()).toBeTruthy();
    expect(rfc.isFisica()).toBeFalsy();
    expect(rfc.calculateChecksum()).toBe('A');
    expect(rfc.doesCheckSumMatch()).toBeTruthy();
    expect(rfc.calculateSerial()).toBe(1_348_025_748_541);
  });

  test('create with foreign', () => {
    const rfc = Rfc.unparsed(Rfc.RFC_FOREIGN);

    expect(rfc.isForeign()).toBeTruthy();
    expect(rfc.isFisica()).toBeTruthy();
    expect(rfc.isGeneric()).toBeFalsy();
    expect(rfc.isMoral()).toBeFalsy();
  });

  test('create with generic', () => {
    const rfc = Rfc.unparsed(Rfc.RFC_GENERIC);

    expect(rfc.isGeneric()).toBeTruthy();
    expect(rfc.isFisica()).toBeTruthy();
    expect(rfc.isForeign()).toBeFalsy();
    expect(rfc.isMoral()).toBeFalsy();
  });

  test('parse with correct data', () => {
    const rfc = Rfc.parse('COSC8001137NA');

    expect(`${rfc}`).toBe('COSC8001137NA');
    expect(rfc.toString()).toBe('COSC8001137NA');
    expect(rfc.toLocaleString()).toBe('COSC8001137NA');
  });

  test('parse error', () => {
    expect(() => Rfc.parse('COSC800113-7NA')).toThrow('valid parts');
  });

  test('parse or null', () => {
    expect(Rfc.parseOrNull('COSC8001137NA')).not.toBeNull();
    expect(Rfc.parseOrNull('')).toBeNull();
  });

  test('serial number', () => {
    const rfc = Rfc.fromSerial(1_348_025_748_541);

    // Current serial is undefined.
    expect(rfc.calculateSerial()).toBe(1_348_025_748_541);
    expect(rfc.getRfc()).toBe('DIM8701081LA');
    // Current serial is defined.
    expect(rfc.calculateSerial()).toBe(1_348_025_748_541);
  });

  test('create bad digit', () => {
    const rfc = Rfc.parse('COSC8001137N9');

    expect(rfc.calculateChecksum()).toBe('A');
    expect(rfc.doesCheckSumMatch()).toBeFalsy();
  });

  test('with multibyte', () => {
    const rfcMultibyte = 'AñÑ801231JK0';
    const expected = 'AÑÑ801231JK0';

    const rfc = Rfc.parse(rfcMultibyte);

    expect(rfc.getRfc()).toBe(expected);
  });

  test('json serializable', () => {
    const data = { rfc: Rfc.unparsed('COSC8001137NA') };

    expect(JSON.stringify(data)).toBe('{"rfc":"COSC8001137NA"}');
    expect(data.rfc.toJSON()).toBe('COSC8001137NA');
  });

  test('create generic', () => {
    const rfc = Rfc.newGeneric();

    expect(rfc.getRfc()).toBe(Rfc.RFC_GENERIC);
  });

  test('create foreign', () => {
    const rfc = Rfc.newForeign();

    expect(rfc.getRfc()).toBe(Rfc.RFC_FOREIGN);
  });

  test('all works on rfc valids and invalids', () => {
    expect(Rfc.isValid('COSC8001137NA', Rfc.DISALLOW_GENERIC)).toBeTruthy();
    expect(Rfc.isValid('XEXX010101000', Rfc.DISALLOW_GENERIC)).toBeTruthy();
    expect(Rfc.isValid('XAXX010101000', Rfc.DISALLOW_GENERIC)).toBeFalsy();
  });

  test('not trown nothing on default', () => {
    const thrownFunction = (): void => {
      Rfc.checkIsValid(Rfc.RFC_GENERIC);
    };

    expect(thrownFunction).not.toThrow('público en general');
  });

  test('invalid disallow generic', () => {
    const thrownFunction = (): void => {
      Rfc.checkIsValid(Rfc.RFC_GENERIC, Rfc.DISALLOW_GENERIC | Rfc.DISALLOW_FOREIGN);
    };

    expect(thrownFunction).toThrow('público en general');
  });

  test('invalid disallow foreign', () => {
    const thrownFunction = (): void => {
      Rfc.checkIsValid(Rfc.RFC_FOREIGN, Rfc.DISALLOW_GENERIC | Rfc.DISALLOW_FOREIGN);
    };

    expect(thrownFunction).toThrow('operaciones con extranjeros');
  });

  test('is valid', () => {
    expect(Rfc.isValid('COSC8001137NA')).toBeTruthy();
  });

  test('is not valid', () => {
    expect(Rfc.isValid('COSC8099137NA')).toBeFalsy();
  });

  test('obtain date leap years', () => {
    const expected = DateTime.fromISO('2000-02-29').toMillis();

    expect(Rfc.obtainDate('XXX000229XX6')).toBe(expected);

    // Invalid leap year
    expect(Rfc.obtainDate('XXX030229XX6')).toBe(0);
  });

  test.each([
    [''],
    ['ABCD010100AAA'],
    ['ABCD010001AAA'],
    ['ABCD010132AAA'],
    ['ABCD010229AAA'],
    ['ABCD000230AAA'],
    ['ABCD0A0101AAA'],
    ['ABCD010A01AAA'],
    ['ABCD01010AAAA'],
    ['ABCD-10123AAA'],
  ])('obtain date with invalid input %s', (rfc: string) => {
    expect(Rfc.obtainDate(rfc)).toBe(0);
  });
});
