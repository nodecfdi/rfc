/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Rfc } from 'src/rfc';
import { DateTime } from 'luxon';

describe('RFC', () => {
    test('create_rfc_persona_fisica', () => {
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

    test('create_rfc_moral', () => {
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

    test('create_with_foreign', () => {
        const rfc = Rfc.unparsed(Rfc.RFC_FOREIGN);
        expect(rfc.isForeign()).toBeTruthy();
        expect(rfc.isFisica()).toBeTruthy();
        expect(rfc.isGeneric()).toBeFalsy();
        expect(rfc.isMoral()).toBeFalsy();
    });

    test('create_with_generic', () => {
        const rfc = Rfc.unparsed(Rfc.RFC_GENERIC);
        expect(rfc.isGeneric()).toBeTruthy();
        expect(rfc.isFisica()).toBeTruthy();
        expect(rfc.isForeign()).toBeFalsy();
        expect(rfc.isMoral()).toBeFalsy();
    });

    test('parse_with_correct_data', () => {
        const rfc = Rfc.parse('COSC8001137NA');
        expect(`${rfc}`).toBe('COSC8001137NA');
        expect(rfc.toString()).toBe('COSC8001137NA');
        expect(rfc.toLocaleString()).toBe('COSC8001137NA');
    });

    test('parse_error', () => {
        expect(() => Rfc.parse('COSC800113-7NA')).toThrow('valid parts');
    });

    test('parse_or_null', () => {
        expect(Rfc.parseOrNull('COSC8001137NA')).not.toBeNull();
        expect(Rfc.parseOrNull('')).toBeNull();
    });

    test('serial_number', () => {
        const rfc = Rfc.fromSerial(1_348_025_748_541);
        // Current serial is undefined.
        expect(rfc.calculateSerial()).toBe(1_348_025_748_541);
        expect(rfc.getRfc()).toBe('DIM8701081LA');
        // Current serial is defined.
        expect(rfc.calculateSerial()).toBe(1_348_025_748_541);
    });

    test('create_bad_digit', () => {
        const rfc = Rfc.parse('COSC8001137N9');
        expect(rfc.calculateChecksum()).toBe('A');
        expect(rfc.doesCheckSumMatch()).toBeFalsy();
    });

    test('with_multibyte', () => {
        const rfcMultibyte = 'AñÑ801231JK0';
        const expected = 'AÑÑ801231JK0';

        const rfc = Rfc.parse(rfcMultibyte);
        expect(rfc.getRfc()).toBe(expected);
    });

    test('json_serializable', () => {
        const data = { rfc: Rfc.unparsed('COSC8001137NA') };
        expect(JSON.stringify(data)).toBe('{"rfc":"COSC8001137NA"}');
        expect(data.rfc.toJSON()).toBe('COSC8001137NA');
    });

    test('create_generic', () => {
        const rfc = Rfc.newGeneric();
        expect(rfc.getRfc()).toBe(Rfc.RFC_GENERIC);
    });

    test('create_foreign', () => {
        const rfc = Rfc.newForeign();
        expect(rfc.getRfc()).toBe(Rfc.RFC_FOREIGN);
    });

    test('all_works_on_rfc_valids_and_invalids', () => {
        expect(Rfc.isValid('COSC8001137NA', Rfc.DISALLOW_GENERIC)).toBeTruthy();
        expect(Rfc.isValid('XEXX010101000', Rfc.DISALLOW_GENERIC)).toBeTruthy();
        expect(Rfc.isValid('XAXX010101000', Rfc.DISALLOW_GENERIC)).toBeFalsy();
    });

    test('not_trown_nothing_on_default', () => {
        const t = (): void => {
            Rfc.checkIsValid(Rfc.RFC_GENERIC);
        };

        expect(t).not.toThrow('público en general');
    });

    test('invalid_disallow_generic', () => {
        const t = (): void => {
            Rfc.checkIsValid(
                Rfc.RFC_GENERIC,
                Rfc.DISALLOW_GENERIC | Rfc.DISALLOW_FOREIGN
            );
        };

        expect(t).toThrow('público en general');
    });

    test('invalid_disallow_foreign', () => {
        const t = (): void => {
            Rfc.checkIsValid(
                Rfc.RFC_FOREIGN,
                Rfc.DISALLOW_GENERIC | Rfc.DISALLOW_FOREIGN
            );
        };

        expect(t).toThrow('operaciones con extranjeros');
    });

    test('is_valid', () => {
        expect(Rfc.isValid('COSC8001137NA')).toBeTruthy();
    });

    test('is_not_valid', () => {
        expect(Rfc.isValid('COSC8099137NA')).toBeFalsy();
    });

    test('obtain_date_leap_years', () => {
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
    ])('obtain_date_with_invalid_input %s', (rfc: string) => {
        expect(Rfc.obtainDate(rfc)).toBe(0);
    });
});
