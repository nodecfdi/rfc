import { Rfc } from '#src/rfc';
import { RfcFaker } from '#src/rfc_faker';

describe('rfc faker', () => {
  const iterations = 100;
  let faker: RfcFaker;

  beforeAll(() => {
    faker = new RfcFaker();
  });

  test('mexican rfc not null', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfc();

      expect(Rfc.parseOrNull(stringRfc)).not.toBeNull();
    }
  });

  test('mexican rfc persona fisica', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfcFisica();
      const rfc = Rfc.parse(stringRfc);

      expect(rfc.isFisica()).toBeTruthy();
    }
  });

  test('mexican rfc persona moral', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfcMoral();
      const rfc = Rfc.parse(stringRfc);

      expect(rfc.isMoral()).toBeTruthy();
    }
  });
});
