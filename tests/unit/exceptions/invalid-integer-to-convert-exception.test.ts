import { InvalidIntegerToConvertException } from 'src/exceptions/invalid-integer-to-convert-exception';

describe('InvalidIntegerToConvertException', () => {
    test('exception_lower_than_zero', () => {
        const value = -1;
        const exception = InvalidIntegerToConvertException.lowerThanZero(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getValue()).toBe(value);
        expect(exception.message).toContain('lower than zero');
    });

    test('exception_greater_than_maximum', () => {
        const value = -1;
        const exception =
            InvalidIntegerToConvertException.greaterThanMaximum(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getValue()).toBe(value);
        expect(exception.message).toContain('greater than maximum');
    });
});
