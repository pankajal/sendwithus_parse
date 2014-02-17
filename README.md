Sendwithus Parse Module
========================

## About

This is a Parse.com Cloud Code Module for the Sendwithus API based on the official [NodeJS Client](https://github.com/sendwithus/sendwithus_nodejs)

## Installation

Copy `sendwithus.js` to your Parse Cloud Code `cloud` directory


# Usage

All callbacks accept `err` and `data`:

```javascript
var callback = function(err, data) {
    if (err) {
        console.log(err.message, err.status);
    } else {
        console.log(data);
    }
};
```

## List Your Emails

```javascript
var api = require('cloud/sendwithus.js')(API_KEY);
api.emails(callback);
```

## Send an Email

### Call with REQUIRED parameters only

The `email_data` field is optional, but highly recommended!

```javascript
ar api = require('cloud/sendwithus.js')(API_KEY);
api.send({
    email_id: EMAIL_ID,
    recipient: { address: 'us@sendwithus.com'}
}, callback);
```

### Call with REQUIRED parameters and email_data
```javascript
ar api = require('cloud/sendwithus.js')(API_KEY);
api.send({
    email_id: EMAIL_ID,
    recipient: {
        address: 'us@sendwithus.com', // required
        name: 'Matt and Brad' 
    },
    email_data: { first_name: 'Matt' } 
}, callback);
```

### Optional Sender
`sender['address']` is a required sender field

```javascript
var api = require('cloud/sendwithus.js')(API_KEY);
api.send({
    email_id: EMAIL_ID,
    recipient: { address: 'us@sendwithus.com'},
    email_data: { first_name: 'Matt' },
    sender: {
        address: 'company@company.com', // required
        name: 'Company' 
    }
}, callback);
```

### Optional Sender with reply_to address
`sender['name']` and `sender['reply_to']` are both optional

```javascript
var api = require('cloud/sendwithus.js')(API_KEY);
api.send({
    email_id: EMAIL_ID,
    recipient: { address: 'us@sendwithus.com'},
    email_data: { first_name: 'Matt' },
    sender: {
        address: 'company@company.com', // required
        name: 'Company',
        reply_to: 'info@company.com'
    }
}, callback);
```

## expected response

### Error cases

#### malformed request
	
```javascript
	> err.status;
	400
```

#### bad api key

```javascript
	> err.status;    
	403
```


