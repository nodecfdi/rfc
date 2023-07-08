import { InvalidExpressionToParseException } from 'src/exceptions/invalid-expression-to-parse-exception';

describe('InvalidExpressionToParseException', () => {
    test('exception_invalid_parts', () => {
        const value = 'foo';
        const exception = InvalidExpressionToParseException.invalidParts(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getRfc()).toBe(value);
        expect(exception.message).toContain('valid parts');
    });

    test('exception_greater_than_maximum', () => {
        const value = 'foo';
        const exception = InvalidExpressionToParseException.invalidDate(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getRfc()).toBe(value);
        expect(exception.message).toContain('valid date');
    });
});
