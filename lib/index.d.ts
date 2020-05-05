interface schemaDataInterface {
    fieldName: string;
    data: any;
    rules: {
        [index: string]: boolean | number | string;
    };
    messages?: {
        [index: string]: string;
    };
}
interface schemaOptions {
    skipSanitize: string[];
}
interface ruleOptions {
    fieldName: string;
    ruleValue?: string | number | null;
}
declare class HGValidator {
    private readonly defaultRules;
    private errors;
    validate(schema: schemaDataInterface[], options?: schemaOptions): boolean;
    sanitize(data: string, option?: {
        strict: boolean;
    }): string;
    getErrors(): object;
    protected required(data: any, options: ruleOptions): string | true;
    protected string(data: any, options: ruleOptions): string | true;
    protected number(data: any, options: ruleOptions): string | true;
    protected email(data: any, options: ruleOptions): string | true;
    protected min(data: any, options: ruleOptions): string | true;
    protected max(data: any, options: ruleOptions): string | true;
    protected equalTo(data: any, options: ruleOptions): string | true;
    protected pattern(data: any, options: ruleOptions): string | true;
}
declare const Validator: HGValidator;
export default Validator;
