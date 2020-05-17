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
    skip?: any;
}
interface ruleOptions {
    fieldName: string;
    ruleValue?: string | number | null;
}
export default class HGValidator {
    private readonly defaultRules;
    private errors;
    validate(schema: schemaDataInterface[], options?: schemaOptions): boolean | object;
    sanitize(data: string, option?: {
        strict: boolean;
    }): string;
    getErrors(options?: {
        format: string;
    }): any;
    protected required(data: any, options: ruleOptions): string | true;
    protected string(data: any, options: ruleOptions): string | true;
    protected number(data: any, options: ruleOptions): string | true;
    protected email(data: any, options: ruleOptions): string | true;
    protected min(data: any, options: ruleOptions): string | true;
    protected max(data: any, options: ruleOptions): string | true;
    protected equalTo(data: any, options: ruleOptions): string | true;
    protected pattern(data: any, options: ruleOptions): string | true;
}
export {};
