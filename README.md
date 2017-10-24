# baray
_Why is it called 'baray'? cause 'baray' is a verb in kannada (my native language) which means 'to write'_

[![npm](https://img.shields.io/npm/v/baray.svg)](https://www.npmjs.com/package/baray)
[![Travis](https://img.shields.io/travis/aneeshmg/Baray.svg)](https://travis-ci.org/aneeshmg/Baray)
[![Codecov](https://img.shields.io/codecov/c/github/aneeshmg/baray.svg)](https://codecov.io/gh/aneeshmg/Baray)
[![npm](https://img.shields.io/npm/dt/baray.svg)](https://www.npmjs.com/package/baray)

## A minimalistic logger

### Usage:
##### Install
```shell
npm i baray
```

##### Require it
```javascript
const Baray = require('baray')
```

##### Initialize it like..
```javascript
// Showing defaults
const logger = new Baray({
  appName: "NoName",
  console: true, 
  json: true,
  color: false,
  path: `${__dirname}/logs`
})
// if 'color' is set to true (& 'console' is set to true), info, warn & error logs will appear in cyan, yellow & red colors respectively on the console
```
##### _OR_
```javascript
const logger = new Baray()
```

##### _Use it like..._
```javascript 
logger.log("message")
logger.info("message")
logger.warn("message")
logger.error("message")
```

_OR like this...(with JSON content)_
```javascript
logger.log({tag:"sometag", message:"message content"})
logger.info({tag:"sometag", message:"message content"})
logger.warn({tag:"sometag", message:"message content"})
logger.error({tag:"sometag", message:"message content"})
```