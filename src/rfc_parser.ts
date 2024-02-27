import { InvalidExpressionToParseException } from './exceptions/invalid_expression_to_parse_exception';
import { DateTime } from 'luxon';

export class RfcParser {
  private constructor(
    /** "siglas" part ____000101AAA */
    private readonly _name: string,
    /** "año" part AAAA__0101AAA */
    private readonly _year: number,
    /** "mes" part AAAA00__01AAA */
    private readonly _month: number,
    /** "día" part AAAA0001__AAA */
    private readonly _day: number,
    /** "homoclave" part AAAA000101__A */
    private readonly _hKey: string,
    /** "dígito verificador" part AAAA000101AA_ */
    private readonly _checksum: string,
    /** Converter datetime of current rfc */
    private readonly _date: DateTime,
  ) {}

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
      /^(?<name>[A-ZÑ&]{3,4})(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})(?<hkey>[A-Z\d]{2})(?<checksum>[A\d])$/u;
    const matches = regex.exec(rfc.toUpperCase());
    if (!matches?.groups) {
      throw new Error('The RFC expression does not contain the valid parts');
    }

    const date = DateTime.fromISO(
      `20${matches.groups.year}-${matches.groups.month}-${matches.groups.day}`,
    );
    if (
      `${matches.groups.year}${matches.groups.month}${matches.groups.day}` !==
      date.toFormat('yyLLdd')
    ) {
      throw InvalidExpressionToParseException.invalidDate(rfc);
    }

    return new RfcParser(
      matches.groups.name,
      Number(matches.groups.year),
      Number(matches.groups.month),
      Number(matches.groups.day),
      matches.groups.hkey,
      matches.groups.checksum,
      date,
    );
  }

  public getName(): string {
    return this._name;
  }

  public getYear(): number {
    return this._year;
  }

  public getMonth(): number {
    return this._month;
  }

  public getDay(): number {
    return this._day;
  }

  public getHKey(): string {
    return this._hKey;
  }

  public getChecksum(): string {
    return this._checksum;
  }

  public getDate(): DateTime {
    return this._date;
  }
}
