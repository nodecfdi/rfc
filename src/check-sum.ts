export class CheckSum {
    private readonly DICTIONARY: Record<string, number> = {
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
        '&': 24,
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
        ' ': 37,
        '#': 38
    };

    public calculate(rfc: string): string {
        const chars = [...rfc.replace(/Ñ/g, '#')];
        chars.pop(); // Remove predefined checksum
        let sum = chars.length === 11 ? 481 : 0; // 481 para morales, 0 para físicas
        const index = chars.length + 1;
        for (const [index_, char] of chars.entries()) {
            sum += (this.DICTIONARY[char] || 0) * (index - index_);
        }

        let digit = `${11 - (sum % 11)}`;
        if (digit === '11') {
            digit = '0';
        } else if (digit === '10') {
            digit = 'A';
        }

        return digit;
    }
}
