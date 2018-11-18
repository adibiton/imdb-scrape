'use strict'
const cheerio = require('cheerio')

class ScrapeController {
    constructor(scrapeService) {
        this.scrapeClient = scrapeService
    }

    async getMovieMetadata(id) {
        const moviePage = await this.scrapeClient.getMoviePage(id)
        const $ = cheerio.load(moviePage.data)
        return Object.assign({},
            {title: this._scrapeMovieTitle($)},
            {release: this._scrapeMovieYear($)},
            {rating: this._scrapeMovieRating($)})
    }

    async getMoviesMetadata(filter) {
        if (filter) {
            const topMovies = await this.scrapeClient.getMovies(filter)
            const $ = cheerio.load(topMovies.data)
            const movies = $('.lister-item.mode-detail')
                .map((_, el) => {
                    const name = this._scrapeTitle($, el)
                    const year = this._scrapeYear($, el)
                    const rating = this._scrapeRating($, el)
                    if (!rating || rating < 6.8 || !year)
                        return null
                    return {name, rating, year}
                })
                .get()
            return movies
        }
        return {}
    }

    _scrapeYear($, el) {
        let year = /\d{4}/g.exec($(el).find('.lister-item-year').text())
        if (year)
            year = year[0]
        return year
    }

    _scrapeRating($, el) {
        return $(el).find('.ipl-rating-widget').children('.ipl-rating-star').children('.ipl-rating-star__rating').text()
    }
    _scrapeTitle($, el){
        return $(el).children('.lister-item-content').children('.lister-item-header').children('a').text()
    }
    
    _scrapeMovieTitle($) {
        return $('div.title_wrapper h1').contents().first().text().trim()
    }

    _scrapeMovieYear($) {
        return $('div.title_wrapper h1').children().first().children().first().text().trim()
    }

    _scrapeMovieRating($) {
        return $('div.ratingValue').children().first().children().first().text().trim()
    }
}

module.exports = ScrapeController
