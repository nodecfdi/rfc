import { Rfc } from '~/rfc';
import { RfcFaker } from '~/rfc-faker';

describe('RfcFaker', () => {
    const iterations = 100;
    let faker: RfcFaker;

    beforeAll(() => {
        faker = new RfcFaker();
    });

    test('mexican rfc', () => {
        for (let i = 0; i < iterations; i++) {
            const strRfc = faker.mexicanRfc();
            expect(Rfc.parseOrNull(strRfc)).not.toBeNull();
        }
    });

    test('mexican rfc persona fisica', () => {
        for (let i = 0; i < iterations; i++) {
            const strRfc = faker.mexicanRfcFisica();
            const rfc = Rfc.parse(strRfc);
            expect(rfc.isFisica()).toBeTruthy();
        }
    });

    test('mexican rfc persona moral', () => {
        for (let i = 0; i < iterations; i++) {
            const strRfc = faker.mexicanRfcMoral();
            const rfc = Rfc.parse(strRfc);
            expect(rfc.isMoral()).toBeTruthy();
        }
    });
});
