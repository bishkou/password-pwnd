#!/usr/bin/env node
const crypto = require('crypto');
const fetch = require('node-fetch');


const pwnd = async (password) => {
    password = password.trim()
    const hashed_pwd = await crypto.createHash('sha1').update(password).digest('hex');

    const head = hashed_pwd.slice(0, 5);
    const tail = hashed_pwd.slice(5).toUpperCase();
    const url = 'https://api.pwnedpasswords.com/range/' + head

    const data = await fetch(url)
        .then(res => res.text())
        .catch( () => {
            return Promise.reject('Failed to fetch HIBP API')
        })
    if (data) {
        const re = new RegExp(tail + ':(\\d+)');
        const match = data.match(re);
        if (match) {
            return parseInt(match[1])
        }
        return 0
    }
    return Promise.reject('Something went wrong')

}


module.exports = {
    pwnd: pwnd
}
