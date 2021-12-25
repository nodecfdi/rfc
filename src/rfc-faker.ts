import { RfcIntConverter } from './rfc-int-converter';

/**
 * This class creates a random but syntactically valid Rfc string.
 */
export class RfcFaker {
    /**
     * Return an RFC for Persona Moral (12 multibyte chars length) or Persona Fisica (13 multibyte chars length)
     *
     * @example COSC8001137NA, EKU9003173C9
     */
    public mexicanRfc(): string {
        // from moral to fisica, moral is lower than fisica
        return this.privateMakeRfc(RfcIntConverter.MORAL_LOWER_BOUND, RfcIntConverter.FISICA_UPPER_BOUND);
    }

    /**
     * Return an RFC for Persona Moral (12 multibyte chars length)
     *
     * @example EKU9003173C9
     */
    public mexicanRfcMoral(): string {
        return this.privateMakeRfc(RfcIntConverter.MORAL_LOWER_BOUND, RfcIntConverter.MORAL_UPPER_BOUND);
    }

    /**
     * Return an RFC for Persona Fisica (13 multibyte chars length)
     *
     * @example COSC8001137NA
     */
    public mexicanRfcFisica(): string {
        return this.privateMakeRfc(RfcIntConverter.FISICA_LOWER_BOUND, RfcIntConverter.FISICA_UPPER_BOUND);
    }

    private privateMakeRfc(lowerBound: number, upperBound: number): string {
        const converter = new RfcIntConverter();
        const random = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
        return converter.intToString(random);
    }
}
