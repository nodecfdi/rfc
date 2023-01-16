import { Rfc } from '~/rfc';
import { RfcFaker } from '~/rfc-faker';

describe('RfcFaker', () => {
    const iterations = 100;
    let faker: RfcFaker;

    beforeAll(() => {
        faker = new RfcFaker();
    });

    test('mexican rfc not null', () => {
        for (let index = 0; index < iterations; index++) {
            const stringRfc = faker.mexicanRfc();
            expect(Rfc.parseOrNull(stringRfc)).not.toBeNull();
        }
    });

    test('mexican rfc persona fisica', () => {
        for (let index = 0; index < iterations; index++) {
            const stringRfc = faker.mexicanRfcFisica();
            const rfc = Rfc.parse(stringRfc);
            expect(rfc.isFisica()).toBeTruthy();
        }
    });

    test('mexican rfc persona moral', () => {
        for (let index = 0; index < iterations; index++) {
            const stringRfc = faker.mexicanRfcMoral();
            const rfc = Rfc.parse(stringRfc);
            expect(rfc.isMoral()).toBeTruthy();
        }
    });
});
