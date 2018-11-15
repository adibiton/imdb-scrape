'use strict'
const cheerio = require('cheerio')
const axios = require('axios')
const movieUrlPrefix = 'https://www.imdb.com/title/'

class Scrape {
    async movie(id) {
        const moviePage = await this._getMoviePage(id)
        const $ = cheerio.load(moviePage.data)
        return Object.assign({}, 
            {title: this._scrapeTitle($)}, 
            {release: this._scrapeRelease($)}, 
            {rating: this._scrapeRating($)})
    }
    
    async internalLinks(url) {
        const page = await axios.get(url)
        const $ = cheerio.load(page.data)
        const links = $('a')
            .map(function() {
                return $(this).attr('href')
            })
            .get()
            .filter(this._isValidLink)
            .map(this._concateSourceUrl(url))
        return links
    }
    async _getMoviePage(id) {
        return await axios.get(this._getMovieUrl(id))
    }
    _concateSourceUrl(url) {
        return (suffix) =>  url + suffix
    }
    _isValidLink(link) {
        return link && link.length > 1 && link.startsWith('/')
    }
    
    _getMovieUrl(id) {
        return `${movieUrlPrefix}${id}`
    }
    _scrapeTitle($) {
        return $('div.title_wrapper h1').contents().first().text().trim()
    }
    _scrapeRelease($) {
        return $('div.title_wrapper h1').children().first().children().first().text().trim()
    }
    _scrapeRating($) {
        return $('div.ratingValue').children().first().children().first().text().trim()
    }
} 

module.exports = new Scrape()
