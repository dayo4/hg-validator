## INTRO
A simple, schema-structured javascript data validator.

Can be easily used both client side and server side.
This is created as a generic and independent validation solution for use in any context.

Works in any typescript and javascript project.

# **Installation**

```javascript
npm i hgvalidator --save
```

# **Usage**


#### **Import the module**

```javascript
import Validator from 'hgvalidator'
```

#### Some data to validate (These may have been extracted directly from forms or sent as request body to the server)

```javascript
let title = '   '
let content = 'Some long wysiwyg content'
let username = user123
let random = 78


// A variable to store the validation errors, if any..
let validationErrors = null
```

#### Every validation requires a SCHEMA which must be an array of objects like in the example below.

```javascript
const schema = [
	{
		fieldName: 'Title', //Required as custom reference to the validated field.
		data: title,	//The data to validate
		rules: {
			required: true,
			string: true,
			max: 200	// The min/max rules work for both strings (returns characters length), and numbers (returns digit size).
		},
		messages: { //Optional. Add some custom validation messages if necessary.
			max: 'Title should not be more than 200 characters'
		}
	},
	{
		fieldName: 'Content',
		data: content,
		rules: {
			required: true,
		},
	},
	{
		fieldName: 'Username',
		data: username,
		rules: {
			required: true,
			pattern: /^([a-zA-Z]{4,})([0-9])*$/
		},
		message:{
			pattern: 'blah blah blah'
		}
	},
	{
		fieldName: 'Random',
		data: random,
		rules: {
			required: true,
			min: 100
		},
	}
]
```

**[See all default supported validation rules](#Supported_Rules)**

#### **Validate the data**

```javascript
const validated = Validator.validate(schema, { skip: ['Content'] })

	/*	The "skip" option prevents validation of the fields names listed in the array. This is Useful when using same schema for multiple validations
	*/

if(validated) {
	console.log('success')
	// preceed with other stuffs
}
else {
	validationErrors = Validator.getErrors()

	// Validator.getErrors() returns an object (contaning the first error of each validated field) by default..
	// Result:
		{
			Title: "Title is required and cannot be empty",
			Random: "Random value should not be less than 100",
		}

	//If you'd like to get back only one error, use the {"format:'single'}" option.
	validationErrors = Validator.getErrors({format: 'single'})
		// Result:
		"Title is required and cannot be empty"

}
```

#### **Then in the html (if validating a form)**
```html
<input id="title" name="title" />
<span id="titleErrorMsg">{{ titleErrorMsg }}</span>
...
...
...
...

<script>
...
...
	document.querySelector('#titleErrorMsg').innerText = validationErrors['Title']
</script>
```

#### **Available utility methods**
```javascript
- Validator.validate(schema, options = {}) //This has been explained above


- Validator.sanitize(data, options = {}) // for personally stripping out all html tags and trimming empty spaces in data.
		/*Sanitize options */
		const options = {
			strict: false // defaults to 'true'.
					/* 	If false, only '<script>' tags will be removed from the data, other tags will be left.
						And only beginning and ending whitespaces will be removed. */
		}


- Validator.getErrors() // returns validation errors
```


## Supported_Rules

```javascript
rules: {
	required: boolean
	string: boolean
	email: boolean
	number: boolean
	min: number
	max: number
	equalTo: any
	pattern: RegExp
}
```






## **disclaimer**
Please note that no guarantee of any kind is granted with the use of this code.
