"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HGValidator = /** @class */ (function () {
    function HGValidator() {
        this.defaultRules = ['required', 'string', 'number', 'email', 'min', 'max', 'equalTo', 'pattern'];
        this.errors = {};
    }
    HGValidator.prototype.log = function (error) {
        console.error(error);
    };
    HGValidator.prototype.validate = function (schema, options) {
        var _this = this;
        if (!Array.isArray(schema)) {
            throw new TypeError('The validation schema is expected to be an array of objects.');
        }
        this.errors = {};
        var failedValidations = 0;
        var _loop_1 = function (x) {
            var _a;
            var fieldName = x.fieldName;
            var data = function () {
                if (options) {
                    if (options.skipSanitize && Array.isArray(options.skipSanitize) && options.skipSanitize.includes(fieldName)) {
                        return x.data;
                    }
                    return _this.sanitize(x.data);
                }
                return _this.sanitize(x.data);
            };
            var rules = x.rules;
            var messages = x.messages;
            for (var _i = 0, _b = Object.keys(rules); _i < _b.length; _i++) {
                var y = _b[_i];
                if (!(this_1.defaultRules.includes(y))) {
                    throw new Error('Unknown rule type( ' + y + ' ) detected in schema with field name "' + fieldName + '".');
                }
                else if (rules[y]) {
                    var response = this_1[y](data(), { fieldName: fieldName, ruleValue: rules[y] });
                    if (response !== true) {
                        this_1.log(messages ? messages[y] : response);
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
            _loop_1(x);
        }
        if (failedValidations === 0) {
            console.log('all valid');
            return true;
        }
        console.log('invalid');
        return false;
    };
    HGValidator.prototype.sanitize = function (data, option) {
        if (option && option.strict == false) {
            return data.replace(/(<([script^>]+)>)/ig, "").trim();
        }
        return data.replace(/(<([^>]+)>)/ig, "").replace(/[\s]+/g, ' ').trim();
    };
    Object.defineProperty(HGValidator.prototype, "getErrors", {
        get: function () {
            return this.errors;
        },
        enumerable: true,
        configurable: true
    });
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
        if (typeof Number(options.ruleValue) !== 'number') {
            throw new TypeError("The value of \"MIN\" rule in FIELD-(" + options.fieldName + ") is expected to be a number.");
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
        if (typeof Number(options.ruleValue) !== 'number') {
            throw new TypeError("The value of \"MAX\" rule in FIELD-(" + options.fieldName + ") is expected to be a number.");
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
        return options.fieldName + " should be equala to " + options.ruleValue + ".";
    };
    HGValidator.prototype.pattern = function (data, options) {
        // if (options.ruleValue != RegExp)
        // {
        //     this.log('The value of "PATTERN" rule is expected to be a Regular Expression (REGEXP)')
        // }
        if (data.match(options.ruleValue)) {
            return true;
        }
        return options.fieldName + " must match pattern " + options.ruleValue + ".";
    };
    return HGValidator;
}());
var Validator = new HGValidator();
exports.default = Validator;
