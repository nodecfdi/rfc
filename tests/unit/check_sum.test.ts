import { CheckSum } from '../../src/check_sum';

describe('CheckSum', () => {
  let checksum: CheckSum;

  beforeAll(() => {
    checksum = new CheckSum();
  });

  test('check_sum_with_rfc_persona_fisica', () => {
    const expected = 'A';
    const rfc = 'COSC8001137NA';

    expect(checksum.calculate(rfc)).toBe(expected);
  });

  test('check_sum_with_multibyte', () => {
    const expected = '0';
    const rfc = 'AÑÑ801231JK0';

    expect(checksum.calculate(rfc)).toBe(expected);
  });

  test('check_sum_with_rfc_moral', () => {
    expect(checksum.calculate('IDE2001209V6')).toBe('6');
  });
});
