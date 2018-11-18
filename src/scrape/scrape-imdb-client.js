'use strict'
const {MOVIES_LIST_PREFIX, MOVIE_PREFIX, LIST_BY_YEAR} = require('./scrape-constants')

class ScrapeImdbClient {
    constructor(httpClient) {
        this.httpClient = httpClient
    }

    async getMoviePage(id) {
        return await this.httpClient.get(this._getMovieUrl(id))
    }

    async getMovies(filters) {
        let url = MOVIES_LIST_PREFIX
        if (filters) {
            filters.forEach(filter => {
                if (filter.name === 'year') {
                    url += LIST_BY_YEAR[filter.value]
                    url += '?sort=user_rating,desc'
                }
            })
        }
        return await this.httpClient.get(url)
    }

    async internalLinks(url) {
        const page = await this.httpClient.get(url)
        const $ = cheerio.load(page.data)
        const links = $('a')
            .map(function () {
                return $(this).attr('href')
            })
            .get()
            .filter(this._isValidLink)
            .map(this._concateSourceUrl(url))
        return links
    }

    _getMovieUrl(id) {
        return `${MOVIE_PREFIX}${id}`
    }

    _concateSourceUrl(url) {
        return (suffix) => url + suffix
    }

    _isValidLink(link) {
        return link && link.length > 1 && link.startsWith('/')
    }
}

module.exports = ScrapeImdbClient
