## INTRO
A simple, schema-structured javascript data validator.

Can be easily used both client side and server side.
This is created as a generic and independent validation solution for use in any context.

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
		messages: { //Add some custom validation messages if necessary.
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
const validation = Validator.validate(schema, { skipSanitize: ['Content'] })

	/*	The validator sanitizes all data by default. That is, strips all html tags and trims all extra spaces from the data.

		The "skipSanitize" option prevents sanitization of the field names listed in the array. In this case, the post content field.
	*/

if(validation) {
	console.log('success')
	// preceed with other stuffs
}
else {
	validationErrors = Validator.getErrors()

	// Validator.getErrors() returns an object..
	// Example:
	/*
		{
			Title: "Title is required and can not be empty",
			Random: "Random's value should not be less than 100",
		}
	*/

	//use any
}
```

#### **Then in the html (if validating a form)**
```html
<input id="title" name="title" />
<span>{{ titleErrorMsg }}</span>
...
...
...
...

<script>
...
...
	document.querySelector('#title').innerText = validationErrors['Title']
</script>
```


## Supported_Rules and corresponding data types.

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






# **disclaimer**
Please note that no guarantee of any kind is granted with the use of this code.
