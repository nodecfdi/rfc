import { InvalidIntegerToConvertException } from '../../../src/exceptions/invalid-integer-to-convert-exception';

describe('InvalidIntegerToConvertException', () => {
    test('exception lower than zero', () => {
        const value = -1;
        const exception = InvalidIntegerToConvertException.lowerThanZero(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getValue()).toBe(value);
        expect(exception.message).toContain('lower than zero');
    });

    test('exception greater than maximum', () => {
        const value = -1;
        const exception = InvalidIntegerToConvertException.greaterThanMaximum(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getValue()).toBe(value);
        expect(exception.message).toContain('greater than maximum');
    });
});
