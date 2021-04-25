#!/usr/bin/env node
const crypto = require('crypto');
const fetch = require('node-fetch');


/**
 * Check if a password has appeared in any data breach
 * using hibp (https://haveibeenpwned.com/Passwords) API
 * @param {string} password - The password to check
 * @returns {Promise<Object>} returns a promise with the result
 */
const pwnd = async (password) => {
    if (typeof password !== 'string') {
        return Promise.reject('You must provide a string as an argument')
    }

    // Hash the password
    const hashed_pwd = await crypto.createHash('sha1').update(password).digest('hex');

    // Get the first 5 chars and save the rest
    const head = hashed_pwd.slice(0, 5);
    const tail = hashed_pwd.slice(5).toUpperCase();

    const url = 'https://api.pwnedpasswords.com/range/' + head

    // HIBP API call
    const data = await fetch(url)
        .then(res => res.text())
        .catch( (err) => {
            return Promise.reject(err)
        })

    if (data) {
        const re = new RegExp(tail + ':(\\d+)');
        const match = data.match(re);

        /* if there is a match, returns the number of breaches found
            else returns 0
         */
        return match ? parseInt(match[1]) : 0
    }
    return Promise.reject('Something went wrong')

}

/**
 * Check if a password is strong enough
 * The Password must contain at least 1 lowercase** and 1 uppercase alphabetical character,
 at least 1 numeric character**, at least 1 special character and it must be 8 characters or longer.
 * @param {string} password - The password to check
 * @returns {number} returns a number (1 or 0)
 */

const strong = async (password) => {
    if (typeof password !== 'string') {
        throw 'You must provide a string as an argument';
    }

    // RegEx of a strong password
    const strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const match = password.match(strongReg);

    return match ? 1 : 0

}


/**
 * Check if a password is super-strong
 * The password will pass both pwnd and strong tests
 * If the pwnd test fails for some reason you'll receive
 * a warning but the test will pass to the strong test
 * @param {string} password - The password to check
 * @returns {boolean} returns a boolean
 */
const super_strong = async (password) => {
    if (typeof password !== 'string') {
        return Promise.reject('You must provide a string as an argument')
    }

    const leaked = await pwnd(password)
        .catch(() => {
            console.warn('Something went wrong while fetching data from the API, PWND check didn\'t work as expected ' +
                'the strong password Check will now start')
        })

    if (!leaked) {
        const strength = await strong(password)
        if (strength) {
            return true
        }
    }
    return false


}


module.exports = {
    pwnd: pwnd,
    strong: strong,
    super_strong: super_strong

}
