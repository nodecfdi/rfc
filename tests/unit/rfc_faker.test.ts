import { Rfc } from '../../src/rfc.js';
import { RfcFaker } from '../../src/rfc_faker.js';

describe('rfcFaker', () => {
  const iterations = 100;
  let faker: RfcFaker;

  beforeAll(() => {
    faker = new RfcFaker();
  });

  test('mexican_rfc_not_null', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfc();

      expect(Rfc.parseOrNull(stringRfc)).not.toBeNull();
    }
  });

  test('mexican_rfc_persona_fisica', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfcFisica();
      const rfc = Rfc.parse(stringRfc);

      expect(rfc.isFisica()).toBeTruthy();
    }
  });

  test('mexican_rfc_persona_moral', () => {
    for (let index = 0; index < iterations; index += 1) {
      const stringRfc = faker.mexicanRfcMoral();
      const rfc = Rfc.parse(stringRfc);

      expect(rfc.isMoral()).toBeTruthy();
    }
  });
});
