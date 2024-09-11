export default class CheckSum {
  private readonly DICTIONARY: Record<string, number> = {
    ' ': 37,
    '#': 38,
    '&': 24,
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'G': 16,
    'H': 17,
    'I': 18,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'O': 25,
    'P': 26,
    'Q': 27,
    'R': 28,
    'S': 29,
    'T': 30,
    'U': 31,
    'V': 32,
    'W': 33,
    'X': 34,
    'Y': 35,
    'Z': 36,
  };

  private readonly DIGIT_OVERRIDE: Record<number, string> = {
    10: 'A',
    11: '0',
  };

  public calculate(rfc: string): string {
    const chars = [...rfc.replaceAll('Ñ', '#')];
    const { length } = chars;

    chars.pop(); // remover el dígito predefinido

    // Valor inicial de la suma: 481 para morales, 0 para físicas
    let sum = length === 12 ? 481 : 0;

    for (const [index, char] of chars.entries()) {
      sum += (this.DICTIONARY[char] || 0) * (length - index);
    }

    // posibles valores: [1, 2, ..., 10, 11] porque sum % 11 = int<0, 10>
    const digit = 11 - (sum % 11);

    // se retorna 10 => 0, 11 => A o el valor obtenido
    return this.DIGIT_OVERRIDE[digit] || digit.toString();
  }
}
