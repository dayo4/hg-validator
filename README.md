*This readme is incomplete!!*

# **Installation**
	npm i hgvalidator --save


# **Usage**
##### MAIN VALIDATION EXAMPLES


**import the module**
	import Validator from 'hgvalidator'

//Data to validate
	let title = 'Some random text'
	let content = 'Some long wysiwyg content'

//variable to store returned errors.
let validationErrors = null


//Every validation requires a SCHEMA which must be an array of objects like in the example below.
	const schema = [
		{
			fieldName: 'Title',
			data: title,
			rules: {
				required: true,
				string: true,
				min: 10,
				max: 200
			},
			message: {
				max: 'Title should not be more than 200 characters'
			}
		},
		{
			fieldName: 'Content',
			data: content,
			rules: {
				required: true,
			},
		}
	]

//validate the data
const validation = Validator.validate(schema, { skipSanitize: ['Content'] })

if(validation) {
    console.log('success')
    // preceed with stuffs
}
else {
    validationErrors = Validator.getErrors
}
