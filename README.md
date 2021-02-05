<h1 align="center">Welcome to password-pwnd 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/password-pwnd" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/password-pwnd.svg">
  </a>
  <a href="https://github.com/bishkou/password-checker#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bishkou/password-checker/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bishkou/password-checker/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bishkou/password-pwnd" />
  </a>
</p>

> Check if your users passwords have been leaked before and check if they are strong enough

### 🏠 [Homepage](https://github.com/bishkou/password-checker)

## Install

```sh
npm i password-pwnd
```

## Check if the password have been leaked before

```js
// pwnd checks if the password your provided has been found in previous leaks or not
const { pwnd } = require('password-pwnd')

check = async () => {
    // Enter the password desired
    // Make sure to use the await syntax since we're fetching
    // data from an API and it can take a second to get the res
    const leak = await pwnd('password')
    // if the value is different from 0
    if (leak) {
        console.log('Please change your password, it has been found in a previous leak')
    }
    // if the value is 0
    else console.log('You are good to go')
}

```
## Catching Erros
```js
// I Highly recommend you try to catch errors since we are making
// a call to an API and it can fail at any given moment
const leak = await pwnd('password')
    .catch(err => {
        console.log(err)
    })
```

## Author

👤 **Chedy**

* Github: [@bishkou](https://github.com/bishkou)
* LinkedIn: [@chedyhm](https://linkedin.com/in/chedyhm)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bishkou/password-checker/issues). You can also take a look at the [contributing guide](https://github.com/bishkou/password-checker/blob/master/CONTRIBUTING.md).

## Show your support

Give a STAR if this project helped you!

## Source of the data

* All thanks to HIBP API.
* Their API provides 613,584,246 real world passwords previously exposed in data breaches.
[HIBP API](https://haveibeenpwned.com/API/v3)
## 📝 License

* Copyright © 2021 [Chedy](https://github.com/bishkou).
* This project is [MIT](https://github.com/bishkou/password-checker/blob/master/LICENSE) licensed.

***
_This README was generated with by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
