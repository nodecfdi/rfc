import { RfcParser } from './rfc-parser';
import { RfcIntConverter } from './rfc-int-converter';
import { CheckSum } from './check-sum';

/**
 * Value object representation of an RFC.
 */
export class Rfc {
    /** Generic representation of an RFC (some use cases include to invoice without RFC) */
    public static RFC_GENERIC = 'XAXX010101000';

    /** Foreign representation of RFC (used on foreign parties that does not have mexican RFC) */
    public static RFC_FOREIGN = 'XEXX010101000';

    private readonly rfc: string;
    private readonly length: number;

    /** Contains calculated checksum  */
    private checksum: string | undefined;

    /** Contains calculated integer representation  */
    private serial: number | undefined;

    private constructor(rfc: string) {
        this.rfc = rfc;
        this.length = this.rfc.length;
    }

    /**
     * Parse a string and return a new Rfc instance, otherwise will throw an exception.
     *
     * @param rfc
     * @throws { InvalidExpressionToParseException }
     */
    public static parse(rfc: string): Rfc {
        const parts = RfcParser.parse(rfc);
        rfc = [
            parts.getName(),
            `${parts.getYear()}`.padStart(2, '0'),
            `${parts.getMonth()}`.padStart(2, '0'),
            `${parts.getDay()}`.padStart(2, '0'),
            parts.getHKey(),
            parts.getChecksum(),
        ].join('');
        return new Rfc(rfc);
    }

    /**
     * Parse a string, if unable to parse will return NULL.
     *
     * @param rfc
     */
    public static parseOrNull(rfc: string): Rfc | null {
        try {
            return Rfc.parse(rfc);
        } catch (e) {
            return null;
        }
    }

    /**
     * Method to create the object if and only you already thrust the contents.
     *
     * @param rfc
     */
    public static unparsed(rfc: string): Rfc {
        return new Rfc(rfc);
    }

    /**
     * Create a Rfc object based on its numeric representation.
     *
     * @param serial
     * @throws { InvalidIntegerToConvertException }
     */
    public static fromSerial(serial: number): Rfc {
        return new Rfc(new RfcIntConverter().intToString(serial));
    }

    public static newGeneric(): Rfc {
        return new Rfc(Rfc.RFC_GENERIC);
    }

    public static newForeign(): Rfc {
        return new Rfc(Rfc.RFC_FOREIGN);
    }

    /**
     * Return the rfc content, remember that it is a multibyte string
     */
    public getRfc(): string {
        return this.rfc;
    }

    /**
     * Return true if the RFC corresponds to a "Persona Física"
     */
    public isFisica(): boolean {
        return 13 === this.length;
    }

    /**
     * Return true if the RFC corresponds to a "Persona Moral"
     */
    public isMoral(): boolean {
        return 12 === this.length;
    }

    /**
     * Return true if the RFC corresponds to a generic local RFC
     */
    public isGeneric(): boolean {
        return Rfc.RFC_GENERIC === this.rfc;
    }

    /**
     * Return true if the RFC corresponds to a generic foreign RFC
     */
    public isForeign(): boolean {
        return Rfc.RFC_FOREIGN === this.rfc;
    }

    /**
     * Calculates the checksum of the RFC.
     * Be aware that there are some valid RFC with invalid checksum.
     */
    public calculateChecksum(): string {
        if (!this.checksum) {
            this.checksum = new CheckSum().calculate(this.getRfc());
        }
        return this.checksum;
    }

    /**
     * Return true if the last character of the RFC is the sma as the calculated checksum.
     * Be aware that there are some valid RFC with invalid checksum.
     */
    public doesCheckSumMatch(): boolean {
        return this.calculateChecksum() === this.rfc.charAt(this.length - 1);
    }

    /**
     * Calculates the serial number (integer representation) of the RFC
     */
    public calculateSerial(): number {
        if (!this.serial) {
            this.serial = new RfcIntConverter().stringToInt(this.getRfc());
        }
        return this.serial;
    }

    public toString(): string {
        return this.rfc;
    }

    public toLocaleString(): string {
        return this.rfc;
    }

    public toJSON(): string {
        return this.rfc;
    }
}
