export class InvalidExpressionToParseException extends Error {
    private readonly rfc: string;

    private constructor(message: string, rfc: string) {
        super(message);
        this.rfc = rfc;
    }

    public static invalidParts(rfc: string): InvalidExpressionToParseException {
        return new InvalidExpressionToParseException(
            'The RFC expression does not contain the valid parts',
            rfc,
        );
    }

    public static invalidDate(rfc: string): InvalidExpressionToParseException {
        return new InvalidExpressionToParseException(
            'The RFC expression does not contain a valid date',
            rfc,
        );
    }

    public getRfc(): string {
        return this.rfc;
    }
}
