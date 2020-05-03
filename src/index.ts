interface schemaDataInterface {
    fieldName: string // name of the field being validated. Required as reference to the field.
    data: any//this is the data to be valivated.
    readonly rules: {}
    messages?: {//custom validation messages if provided
        required?: string
        string?: string
    }
}

interface schemaOptions {
    skipSanitize: string[]
}

interface ruleOptions {
    fieldName: string
    ruleValue?: any // for rules that require a validation value. Example: min = 20,
}

class HGValidator {
    private readonly defaultRules: string[] = ['required', 'string', 'number', 'email', 'min', 'max', 'equalTo', 'pattern']
    private errors: object | any = {}

    protected log(error) {
        console.error(error)
    }

    validate(schema: schemaDataInterface[], options?: schemaOptions): boolean | object {
        if (!Array.isArray(schema))
        {
            throw new TypeError('The validation schema is expected to be an array of objects.')
        }
        this.errors = {}
        let failedValidations = 0

        for (const x of schema)
        {
            const fieldName = x.fieldName
            const data = () => {
                if (options)
                {
                    if (options.skipSanitize && Array.isArray(options.skipSanitize) && options.skipSanitize.includes(fieldName))
                    {
                        return x.data
                    }
                    return this.sanitize(x.data)
                }
                return this.sanitize(x.data)

            }
            const rules = x.rules
            const messages = x.messages

            for (const y of Object.keys(rules))
            {
                if (!(this.defaultRules.includes(y)))
                {
                    throw new Error('Unknown rule type( ' + y + ' ) detected in schema with field name "' + fieldName + '".')
                }
                else if (rules[y])
                {
                    const response = this[y](data(), { fieldName, ruleValue: rules[y] })
                    if (response !== true)
                    {
                        this.log(messages ? messages[y] : response)
                        Object.assign(this.errors, {
                            [fieldName]: messages ? messages[y] : response
                        })

                        failedValidations++
                        break
                    }
                }

            }

        }
        if (failedValidations === 0)
        {
            console.log('all valid')
            return true
        }
        console.log('invalid')
        return false
    }
    sanitize(data: string, option?: { strict: boolean }) {
        if (option && option.strict == false)
        {
            return data.replace(/(<([script^>]+)>)/ig, "").trim()
        }
        return data.replace(/(<([^>]+)>)/ig, "").replace(/[\s]+/g, ' ').trim()
    }
    get getErrors() {
        return this.errors
    }
    protected required(data, options: ruleOptions) {
        if (data || data.length > 0 || data !== '')
        {
            return true
        }
        return `${ options.fieldName } is required and cannot be empty.`
    }
    protected string(data, options: ruleOptions) {
        if (typeof data === 'string')
        {
            return true
        }
        return `${ options.fieldName } is expected to be a string.`
    }
    protected number(data, options: ruleOptions) {
        if (typeof data === 'number')
        {
            return true
        }
        return `${ options.fieldName } is expected to be a number or integer.`
    }
    protected email(data, options: ruleOptions) {
        if (data.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))
        {
            return true
        }
        return `${ options.fieldName } must be a valid email address.`
    }
    protected min(data, options: ruleOptions) {
        if (typeof Number(options.ruleValue) !== 'number')
        {
            throw new TypeError(`The value of "MIN" rule in FIELD-(${ options.fieldName }) is expected to be a number.`)
        }
        if (typeof data === 'string' && data.length < options.ruleValue)
        {
            return `${ options.fieldName } should be a minimum of ${ options.ruleValue } characters.`
        }
        else if (typeof data === 'number' && data < options.ruleValue)
        {
            return `${ options.fieldName }'s value should not be less than ${ options.ruleValue }.`
        }
        return true
    }
    protected max(data, options: ruleOptions) {
        if (typeof Number(options.ruleValue) !== 'number')
        {
            throw new TypeError(`The value of "MAX" rule in FIELD-(${ options.fieldName }) is expected to be a number.`)
        }
        if (typeof data === 'string' && data.length > options.ruleValue)
        {
            return `${ options.fieldName } should be a maximum of ${ options.ruleValue } characters.`
        }
        else if (typeof data === 'number' && data > options.ruleValue)
        {
            return `${ options.fieldName }'s value should not be greater than ${ options.ruleValue }.`
        }
        return true
    }
    protected equalTo(data, options: ruleOptions) {
        if (data === options.ruleValue)
        {
            return true
        }
        return `${ options.fieldName } should be equala to ${ options.ruleValue }.`
    }
    protected pattern(data, options: ruleOptions) {
        // if (options.ruleValue != RegExp)
        // {
        //     this.log('The value of "PATTERN" rule is expected to be a Regular Expression (REGEXP)')
        // }
        if (data.match(options.ruleValue))
        {
            return true
        }
        return `${ options.fieldName } must match pattern ${ options.ruleValue }.`
    }

}
const Validator = new HGValidator()

export default Validator
