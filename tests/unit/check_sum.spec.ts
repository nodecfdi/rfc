import { CheckSum } from '#src/check_sum';

describe('checksum', () => {
  let checksum: CheckSum;

  beforeAll(() => {
    checksum = new CheckSum();
  });

  test('check sum with rfc persona fisica', () => {
    const expected = 'A';
    const rfc = 'COSC8001137NA';

    expect(checksum.calculate(rfc)).toBe(expected);
  });

  test('check sum with multibyte', () => {
    const expected = '0';
    const rfc = 'AÑÑ801231JK0';

    expect(checksum.calculate(rfc)).toBe(expected);
  });

  test('check sum with rfc moral', () => {
    expect(checksum.calculate('IDE2001209V6')).toBe('6');
  });
});
