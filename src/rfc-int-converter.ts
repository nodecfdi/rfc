import { DateTime } from 'luxon';
import { InvalidIntegerToConvertException } from './exceptions/invalid-integer-to-convert-exception';

/**
 * RfcIntConverter is a helper class to convert from an integer to RFC and backwards.
 * It should be used with well known string expressions: upper case and be valid according to RFC rules.
 *
 * The integer value is a 64-bit integer, goes from 0 to 332,162,701,516,799.
 * It can be stored in a PHP integer, mysql big int, sqlite int, etc.
 *
 * The way to transform the string to integer is splitting the contents into 9 parts with different bases:
 * | optional name | 3 x required name | day since 2000 | 2 x homoclave | checksum |
 * | base 29       | base 28           | base    36525  | base 36       | base 11  |
 * Rfc COSC8001137NA will be: [3, 14, 18, 2, 416731392, 33, 23, 10] => 40,270,344,269,627
 * To transform from the integer representation it gets modulus for each base and retrieve the 9 integer parts:
 * 40,270,344,269,627 will be: [3, 14, 18, 2, 416731392, 33, 23, 10], then will convert each part to its strings.
 */
export class RfcIntConverter {
    public static MIN_INTEGER_VALUE = 0;

    public static MAX_INTEGER_VALUE = 331482040243200 - 1; // EXP[last] * BASE[last]

    public static FISICA_LOWER_BOUND = 11430415180800; // EXP[last]

    public static FISICA_UPPER_BOUND = RfcIntConverter.MAX_INTEGER_VALUE; // EXP[last]

    public static MORAL_LOWER_BOUND = RfcIntConverter.MIN_INTEGER_VALUE;

    public static MORAL_UPPER_BOUND = RfcIntConverter.FISICA_LOWER_BOUND - 1; // EXP[last] - 1

    private BASES = [11, 36, 36, 36525, 28, 28, 28, 29];

    private EXP = [1, 11, 396, 14256, 520700400, 14579611200, 408229113600, 11430415180800];

    private CSUM_INT_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A'];

    private CSUM_CHAR_INT: Record<string, number> = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
    };

    private HKEY_INT_CHAR = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    private HKEY_CHAR_INT: Record<string, number> = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        G: 16,
        H: 17,
        I: 18,
        J: 19,
        K: 20,
        L: 21,
        M: 22,
        N: 23,
        O: 24,
        P: 25,
        Q: 26,
        R: 27,
        S: 28,
        T: 29,
        U: 30,
        V: 31,
        W: 32,
        X: 33,
        Y: 34,
        Z: 35,
    };

    private NAME_REQ_INT_CHAR = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '&',
        '#',
    ];

    private NAME_REQ_CHAR_INT: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        '&': 26,
        '#': 27,
    };

    private NAME_OPT_INT_CHAR = [
        '_',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '&',
        '#',
    ];

    private NAME_OPT_CHAR_INT: Record<string, number> = {
        _: 0,
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        I: 9,
        J: 10,
        K: 11,
        L: 12,
        M: 13,
        N: 14,
        O: 15,
        P: 16,
        Q: 17,
        R: 18,
        S: 19,
        T: 20,
        U: 21,
        V: 22,
        W: 23,
        X: 24,
        Y: 25,
        Z: 26,
        '&': 27,
        '#': 28,
    };

    /**
     * Convert a valid uppercase RFC string expression to integer,
     *
     * Be aware that if provide malformed RFC will return an integer, but it might not be able to convert it back.
     *
     * @param rfc
     */
    public stringToInt(rfc: string): number {
        const vString = rfc.replace(/Ñ/g, '#').padStart(13, '_');
        const integers = [
            this.EXP[0] * this.CSUM_CHAR_INT[vString.charAt(12)],
            this.EXP[1] * this.HKEY_CHAR_INT[vString.charAt(11)],
            this.EXP[2] * this.HKEY_CHAR_INT[vString.charAt(10)],
            this.EXP[3] * this.strDateToInt(vString.substring(4, 10)),
            this.EXP[4] * this.NAME_REQ_CHAR_INT[vString.charAt(3)],
            this.EXP[5] * this.NAME_REQ_CHAR_INT[vString.charAt(2)],
            this.EXP[6] * this.NAME_REQ_CHAR_INT[vString.charAt(1)],
            this.EXP[7] * this.NAME_OPT_CHAR_INT[vString.charAt(0)],
        ];
        return integers.reduce((a, b) => a + b, 0);
    }

    /**
     * Convert an integer expression to a valid RFC string expression.
     *
     * @param value
     * @throws {InvalidIntegerToConvertException} if value is lower than zero or greater than maximum value
     */
    public intToString(value: number): string {
        if (value < 0) {
            throw InvalidIntegerToConvertException.lowerThanZero(value);
        }
        if (value > RfcIntConverter.MAX_INTEGER_VALUE) {
            throw InvalidIntegerToConvertException.greaterThanMaximum(value);
        }
        const integers: number[] = [];
        this.BASES.forEach((base: number) => {
            const integer = value % base;
            value = (value - integer) / base;
            integers.push(integer);
        });
        const valuesString: string[] = [
            this.NAME_OPT_INT_CHAR[integers[7]],
            this.NAME_REQ_INT_CHAR[integers[6]],
            this.NAME_REQ_INT_CHAR[integers[5]],
            this.NAME_REQ_INT_CHAR[integers[4]],
            this.intTostrDate(integers[3]),
            this.HKEY_INT_CHAR[integers[2]],
            this.HKEY_INT_CHAR[integers[1]],
            this.CSUM_INT_CHAR[integers[0]],
        ];
        return valuesString.join('').replace(/_/g, '').replace(/#/g, 'Ñ');
    }

    protected strDateToInt(value: string): number {
        const valueDate = DateTime.fromFormat(`20${value}`, 'yyyyLLdd');
        return Math.round(Math.abs(DateTime.fromObject({ year: 2000, month: 1, day: 1 }).diff(valueDate, 'days').days));
    }

    protected intTostrDate(value: number): string {
        return DateTime.fromObject({ year: 2000, month: 1, day: 1 })
            .plus({
                days: value,
            })
            .toFormat('yyLLdd');
    }
}
