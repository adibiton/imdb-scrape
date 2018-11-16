'use strict'
const axios = require('axios')
const movieUrlPrefix = 'https://www.imdb.com/title/'
const topMoviesUrl = 'https://www.imdb.com/chart/top?sort=rk,asc&mode=simple'

const scrapeService = {
    async getMoviePage(id) {
        return await axios.get(this._getMovieUrl(id))
    },
    async getTopMovies() {
        return await axios.get(topMoviesUrl)
    },
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
    },
    _getMovieUrl(id) {
        return `${movieUrlPrefix}${id}`
    },
    _concateSourceUrl(url) {
        return (suffix) =>  url + suffix
    },
    _isValidLink(link) {
        return link && link.length > 1 && link.startsWith('/')
    }

}

module.exports = scrapeService
