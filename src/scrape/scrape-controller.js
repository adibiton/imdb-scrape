'use strict'
const cheerio = require('cheerio')

class ScrapeController {
    constructor(scrapeService){
        this.scrapeService = scrapeService
    }
    
    async getMovieMetadata(id) {
        const moviePage = await this.scrapeService.getMoviePage(id)
        const $ = cheerio.load(moviePage.data)
        return Object.assign({},
            {title: this._scrapeTitle($)},
            {release: this._scrapeRelease($)},
            {rating: this._scrapeRating($)})
    }

    async getMoviesMetadata(filter) {
        if(filter && filter === 'top-rated'){
            const topMovies = await this.scrapeService.getTopMovies()
            const $ = cheerio.load(topMovies.data)
            const movies = $('tbody.lister-list tr')
                .map(function() {
                    const name = $(this).children().filter('td.titleColumn').children().first().text()
                    const year = $(this).children().filter('td.titleColumn').children().last().text().replace(/[\(\)]/g, '')
                    const rating = $(this).children().filter('td.ratingColumn').children().first().text()
                    return {name, rating, year}
                })
                .get()
            return movies
        }
        return {}
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

module.exports = ScrapeController
