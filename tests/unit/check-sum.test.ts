import { CheckSum } from '../../src/check-sum';

describe('CheckSum', () => {
    let checksum: CheckSum;

    beforeAll(() => {
        checksum = new CheckSum();
    });

    test('check sum', () => {
        const expected = 'A';
        const rfc = 'COSC8001137NA';

        expect(checksum.calculate(rfc)).toBe(expected);
    });

    test('check sum with multibyte', () => {
        const expected = '0';
        const rfc = 'AÑÑ801231JK0';

        expect(checksum.calculate(rfc)).toBe(expected);
    });
});
