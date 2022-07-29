import { DateTime } from 'luxon';
import { InvalidExpressionToParseException } from './exceptions/invalid-expression-to-parse-exception';

export class RfcParser {
    /** "siglas" part ____000101AAA */
    private readonly name: string;

    /** "año" part AAAA__0101AAA */
    private readonly year: number;

    /** "mes" part AAAA00__01AAA */
    private readonly month: number;

    /** "día" part AAAA0001__AAA */
    private readonly day: number;

    /** "homoclave" part AAAA000101__A */
    private readonly hKey: string;

    /** "dígito verificador" part AAAA000101AA_ */
    private readonly checksum: string;

    /** converter datetime of current rfc */
    private readonly date: DateTime;

    private constructor(
        name: string,
        year: number,
        month: number,
        day: number,
        hKey: string,
        checksum: string,
        date: DateTime
    ) {
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hKey = hKey;
        this.checksum = checksum;
        this.date = date;
    }

    /**
     * @param rfc -
     * @throws InvalidExpressionToParseException
     *
     */
    public static parse(rfc: string): RfcParser {
        /**
         * Explicación de la expresión regular:
         * - desde el inicio
         *      /^
         * - letras y números para el nombre (3 para morales, 4 para físicas)
         *      (?<name>[A-ZÑ&]\{3,4\})
         * - año mes y día, la validez de la fecha se comprueba después
         *      (?<year>[0-9]\{2\})(?<month>[0-9]\{2\})(?<day>[0-9]\{2\})
         * - homoclave (letra o dígito 2 veces + A o dígito 1 vez)
         *      (?<hkey>[A-Z0-9]\{2\})(?<checksum>[A0-9]\{1\})
         * - hasta el final
         *      $/
         * - tratamiento unicode
         *      u
         */
        const regex =
            /^(?<name>[A-ZÑ&]{3,4})(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})(?<hkey>[A-Z0-9]{2})(?<checksum>[A0-9])$/u;
        const matches = rfc.toUpperCase().match(regex);
        if (!matches || !matches.groups) throw new Error('The RFC expression does not contain the valid parts');
        const date = DateTime.fromISO(`20${matches.groups.year}-${matches.groups.month}-${matches.groups.day}`);
        if (`${matches.groups.year}${matches.groups.month}${matches.groups.day}` !== date.toFormat('yyLLdd')) {
            throw InvalidExpressionToParseException.invalidDate(rfc);
        }

        return new RfcParser(
            matches.groups.name,
            Number(matches.groups.year),
            Number(matches.groups.month),
            Number(matches.groups.day),
            matches.groups.hkey,
            matches.groups.checksum,
            date
        );
    }

    public getName(): string {
        return this.name;
    }

    public getYear(): number {
        return this.year;
    }

    public getMonth(): number {
        return this.month;
    }

    public getDay(): number {
        return this.day;
    }

    public getHKey(): string {
        return this.hKey;
    }

    public getChecksum(): string {
        return this.checksum;
    }

    public getDate(): DateTime {
        return this.date;
    }
}
