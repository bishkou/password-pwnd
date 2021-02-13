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

* **Check a Password against 613,584,246 real world passwords previously exposed in data breaches.**

* **Check if a Password has been leaked before**
* **Check if a Password is Strong**


### 🏠 [Homepage](https://github.com/bishkou/password-checker)

## Install

```sh
npm i password-pwnd
```

## Check if a Password has been Leaked Before

```js
/** pwnd checks if the password your provided has been found in previous leaks **/

const { pwnd } = require('password-pwnd')

check = async () => {
    /** 
     Make sure to use the await syntax since we're fetching
    data from an API and it can take a second to get the result
    **/
    const leaked = await pwnd('password123')

    // if the value is 0
    if (!leaked) {
        console.log('You Are Good To Go')
    }
    // if the value is different from 0
    else {
        console.log('Please change your password, it has been found in a previous breach')
   
        /** if you want to get the count of how many times the
        password have been found in previous breaches **/
        console.log(`Password found ${leaked} times`)

    }  

}

```
**DISCLAIMER** :
If the Password isn't found when calling the API
That doesn't necessarily mean it's a good password,
 merely that it's not indexed on this API
 
**BUT** Testing the password against **613,584,246** real leaked passowrds
is a good **INDICATOR** that the password is somewhat **SECURE**


## Catching Errors
```js
/** It is highly recommend you try to catch errors since we are making
 a call to an API and it can fail at any given moment **/

const leaked = await pwnd('password')
    .catch(err => {
        console.log(err)
    })
```

## Check if Your Password is Strong Enough

```js
/** strong checks if your password has
 the requirements of a strong password **/

const { strong } = require('password-pwnd')

check = async () => {
    const strength = await strong('password123')
    // if False
    if (!strength) {
        console.log('Your Password is Weak')
    }
    // if True
    else  console.log('You Are Good To Go')

}
/**
The Password must contain at least 1 lowercase** and 1 uppercase alphabetical character,
 at least 1 numeric character**, at least 1 special character and it must be 8 characters or longer.
 **/

```
**STRONG** :
 
 The Password must contain at least **1 lowercase** and **1 uppercase** alphabetical character,
 at least **1 numeric character**, at least **1 special character** and it must be **8 characters or longer**.
 
## Check if Your Password is Strong and hasn't been leaked

```js
/** super_strong checks the password against both
 previous functions **/

const { super_strong } = require('password-pwnd')

check = async () => {
    const strength = await super_strong('password123')
    // if False
    if (!strength) {
        console.log('Your Password is Weak')
    }
    // if True
    else  console.log('You Are Good To Go')

}
/**
The Password gets checked against both PWND and STRONG functions,
if the PWND API call fails for some reason only the STRONG function gets
executed, and you will get a WARNING in the console
 **/

```
**SUPER_STRONG** :
 
The Password gets checked against both **PWND** and **STRONG** functions,
if the PWND **API call fails** for some reason only the STRONG function gets
executed, and you will get a **WARNING** in the console


## HOW DOES THIS WORK
In order to protect the value of the source password being searched for,
Pwned Passwords also implements a k-Anonymity model that allows a password 
to be searched for by partial hash.<br/> This allows the first 5 characters of
a SHA-1 password hash (not case-sensitive) to be passed to the API (testable by [clicking here](https://api.pwnedpasswords.com/range/21BD1))
<br />
<br />
When a password hash with the same first 5 characters is found in the Pwned Passwords repository,
the API will respond with an HTTP 200 and include the suffix of every hash beginning with
the specified prefix, followed by a count of how many times it appears in the data set.
The API consumer can then search the results of the response for the presence of their source hash
and if not found, the password does not exist in the data set.  

**SOURCE** :  [HIBP](https://haveibeenpwned.com/API/v3)

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
* LINK: [HIBP API](https://haveibeenpwned.com/API/v3)


## 📝 License

* Copyright © 2021 [Chedy](https://github.com/bishkou).
* This project is [MIT](https://github.com/bishkou/password-checker/blob/master/LICENSE) licensed.

***
_This README was generated with by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
