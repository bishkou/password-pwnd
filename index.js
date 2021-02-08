#!/usr/bin/env node
const crypto = require('crypto');
const fetch = require('node-fetch');


const pwnd = async (password) => {
    if (typeof password !== 'string') {
        return Promise.reject('You must provide a string as an argument')
    }
    // Delete any spaces from both sides
    password = password.trim()

    // Hash the password
    const hashed_pwd = await crypto.createHash('sha1').update(password).digest('hex');

    // Get the first 5 chars and save the rest
    const head = hashed_pwd.slice(0, 5);
    const tail = hashed_pwd.slice(5).toUpperCase();

    const url = 'https://api.pwnedpasswords.com/range/' + head

    // HIBP API call
    const data = await fetch(url)
        .then(res => res.text())
        .catch( () => {
            return Promise.reject('Failed to fetch HIBP API')
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

const strong = (password) => {
    if (typeof password !== 'string') {
        return Promise.reject('You must provide a string as an argument')
    }

    password = password.trim()

    // RegEx of a strong password
    const strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const match = password.match(strongReg);

    return match ? 1 : 0

}

const super_strong = async (password) => {
    if (typeof password !== 'string') {
        return Promise.reject('You must provide a string as an argument')
    }

    password = password.trim()

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
