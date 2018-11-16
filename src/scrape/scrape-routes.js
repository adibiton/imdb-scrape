'use strict'

const express = require('express')
const ScrapeController = require('./scrape-controller')
const scrapeService = require('./scrape-service')

const router = express.Router()
const scrapeController = new ScrapeController(scrapeService)

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.get('/scrape/imdb/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId || 'tt4123430'
    const movieMD = await scrapeController.getMovieMetadata(movieId)
    
    res.json(movieMD)
})

router.get('/scrape/internal-links/:url?', async (req, res) => {
    const url = req.params.url || 'https://www.theverge.com'
    const links = await scrapeController.internalLinks(url)
    res.json(links)
})

router.get('/scrape/imdb/movies', async (req, res) => {
    const filter = req.query.filter
    const movies = await scrapeController.getMoviesMetadata(filter)
    
    res.json(movies)
})

module.exports = router
