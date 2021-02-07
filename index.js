#!/usr/bin/env node
const crypto = require('crypto');
const fetch = require('node-fetch');


const pwnd = async (password) => {
    // Delete any spaces from the sides
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
    password = password.trim()

    // RegEx of a strong password
    const strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const match = password.match(strongReg);

    return match ? 0 : 1

}


module.exports = {
    pwnd: pwnd,
    strong: strong

}
