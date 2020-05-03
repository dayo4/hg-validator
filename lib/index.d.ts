interface schemaDataInterface {
    fieldName: string;
    data: any;
    readonly rules: {};
    messages?: {
        required?: string;
        string?: string;
    };
}
interface schemaOptions {
    skipSanitize: string[];
}
interface ruleOptions {
    fieldName: string;
    ruleValue?: any;
}
declare class HGValidator {
    private readonly defaultRules;
    private errors;
    protected log(error: any): void;
    validate(schema: schemaDataInterface[], options?: schemaOptions): boolean | object;
    sanitize(data: string, option?: {
        strict: boolean;
    }): string;
    get getErrors(): any;
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
