'use strict'

const express = require('express')
const scrapeService = require('../src/scrape-service')

const router = express.Router()

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.get('/scrape/imdb/movies/:movieId?', async (req, res) => {
    const movieId = req.params.movieId || 'tt4123430'
    const movieMD = await scrapeService.movie(movieId)
    
    res.json(movieMD)
})

router.get('/scrape/internal-links/:url?', async (req, res) => {
    const url = req.params.url || 'https://www.theverge.com'
    const links = await scrapeService.internalLinks(url)
    res.json(links)
})

module.exports = router
