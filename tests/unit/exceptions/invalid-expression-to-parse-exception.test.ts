import { InvalidExpressionToParseException } from '../../../src';

describe('InvalidExpressionToParseException', () => {
    test('exception invalid parts', () => {
        const value = 'foo';
        const exception = InvalidExpressionToParseException.invalidParts(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getRfc()).toBe(value);
        expect(exception.message).toContain('valid parts');
    });

    test('exception greater than maximum', () => {
        const value = 'foo';
        const exception = InvalidExpressionToParseException.invalidDate(value);
        expect(exception).toBeInstanceOf(Error);
        expect(exception.getRfc()).toBe(value);
        expect(exception.message).toContain('valid date');
    });
});
