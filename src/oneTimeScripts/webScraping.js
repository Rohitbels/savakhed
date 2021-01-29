/**
 * * Only code
 * * Run `npm install --save request request-promise cheerio`
 * ! package `request-promise`, `cheerio` not added to `package.json`
 */

const rp = require('request-promise');
const $ = require('cheerio');

const authors = ['v p kale', 'pu la deshpande', 'A B Patil', 'A. G. Krishnamurthy', 'acharya p. k. atre', 'Alexander McCall Smith', 'asv', 'व पु काळे']

const getUrl = (name) => 'https://www.bookganga.com/eBooks/Authors?IpP=50&Title=' + encodeURI(name.split(' ').join('+'))


authors.forEach(author => {rp(getUrl(author))
  .then(html => {

    const photoURL = $('td > a > img', html)[0].attribs.src;
    console.log(author, " : ", photoURL);

  })
  .catch(err => {
    
    //handle error
    console.log(author, " : not found");

  })})
