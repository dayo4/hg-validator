"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HGValidator = /** @class */ (function () {
    function HGValidator() {
        this.defaultRules = ['required', 'string', 'number', 'email', 'min', 'max', 'equalTo', 'pattern'];
        this.errors = {};
    }
    HGValidator.prototype.validate = function (schema, options) {
        var _this = this;
        if (!Array.isArray(schema)) {
            console.error('The validation schema is expected to be an array of objects.');
            return;
        }
        else {
            this.errors = {};
            var failedValidations = 0;
            var _loop_1 = function (x) {
                var _a;
                if (!x.rules || !x.data || !x.fieldName || typeof x !== 'object' || x === null) {
                    console.error("Validation Schema is invalid or missing required entries.");
                    return { value: void 0 };
                }
                // function ifExists(item: any) {
                //     if (typeof item !== 'undefined' && item !== null)
                //     {
                //         return item
                //     }
                //     else
                //     {
                //         console.error(`One or more of the required entries ["fieldName", "data", "rules"] in schema is undefined or it's value is invalid.`)
                //         return
                //     }
                // }
                var fieldName = x.fieldName;
                var data = function () {
                    var data = x.data;
                    if (options) {
                        var skippable = options.skipSanitize;
                        //@ts-ignore
                        if (skippable && Array.isArray(skippable) && skippable.includes(fieldName)) {
                            return data;
                        }
                        return _this.sanitize(data);
                    }
                    return _this.sanitize(data);
                };
                var rules = x.rules;
                var messages = x.messages;
                for (var _i = 0, _b = Object.keys(rules); _i < _b.length; _i++) {
                    var y = _b[_i];
                    //@ts-ignore
                    if (!(this_1.defaultRules.includes(y))) {
                        console.error("Unknown rule type  \"" + y + "\"  detected in schema with field name \"" + fieldName + "\".");
                        return { value: void 0 };
                    }
                    else if (!rules[y] || rules[y] === null) {
                        console.error("Invalid value assigned to rule \"" + y + "\" in schema with field name \"" + fieldName + "\" .");
                        return { value: void 0 };
                    }
                    else {
                        var response = this_1[y](data(), {
                            fieldName: fieldName,
                            ruleValue: rules[y]
                        });
                        if (response !== true) {
                            //@ts-ignore
                            Object.assign(this_1.errors, (_a = {},
                                _a[fieldName] = messages ? messages[y] : response,
                                _a));
                            failedValidations++;
                            break;
                        }
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, schema_1 = schema; _i < schema_1.length; _i++) {
                var x = schema_1[_i];
                var state_1 = _loop_1(x);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (failedValidations === 0) {
                return true;
            }
            return false;
        }
    };
    HGValidator.prototype.sanitize = function (data, option) {
        if (option && option.strict == false) {
            return data.replace(/(<([script^>]+)>)/ig, "").trim();
        }
        return data.replace(/(<([^>]+)>)/ig, "").replace(/[\s]+/g, ' ').trim();
    };
    HGValidator.prototype.getErrors = function () {
        return this.errors;
    };
    HGValidator.prototype.required = function (data, options) {
        if (data || data.length > 0 || data !== '') {
            return true;
        }
        return options.fieldName + " is required and cannot be empty.";
    };
    HGValidator.prototype.string = function (data, options) {
        if (typeof data === 'string') {
            return true;
        }
        return options.fieldName + " is expected to be a string.";
    };
    HGValidator.prototype.number = function (data, options) {
        if (typeof data === 'number') {
            return true;
        }
        return options.fieldName + " is expected to be a number or integer.";
    };
    HGValidator.prototype.email = function (data, options) {
        if (data.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
            return true;
        }
        return options.fieldName + " must be a valid email address.";
    };
    HGValidator.prototype.min = function (data, options) {
        if (typeof options.ruleValue !== 'number') {
            console.error("The value of \"MIN\" rule in FIELD '" + options.fieldName + "' is expected to be a number.");
        }
        if (typeof data === 'string' && data.length < options.ruleValue) {
            return options.fieldName + " should be a minimum of " + options.ruleValue + " characters.";
        }
        else if (typeof data === 'number' && data < options.ruleValue) {
            return options.fieldName + "'s value should not be less than " + options.ruleValue + ".";
        }
        return true;
    };
    HGValidator.prototype.max = function (data, options) {
        if (typeof options.ruleValue !== 'number') {
            console.error("The value of \"MAX\" rule in FIELD '" + options.fieldName + "' is expected to be a number.");
        }
        if (typeof data === 'string' && data.length > options.ruleValue) {
            return options.fieldName + " should be a maximum of " + options.ruleValue + " characters.";
        }
        else if (typeof data === 'number' && data > options.ruleValue) {
            return options.fieldName + "'s value should not be greater than " + options.ruleValue + ".";
        }
        return true;
    };
    HGValidator.prototype.equalTo = function (data, options) {
        if (data === options.ruleValue) {
            return true;
        }
        return options.fieldName + " should be equall to " + options.ruleValue + ".";
    };
    HGValidator.prototype.pattern = function (data, options) {
        var regExp = options.ruleValue;
        if (regExp.test(data)) {
            return true;
        }
        return options.fieldName + " must match this pattern " + options.ruleValue + ".";
    };
    return HGValidator;
}());
var Validator = new HGValidator();
exports.default = Validator;
