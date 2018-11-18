'use strict'
const {buildSchema} = require('graphql')
const axios = require('axios')
const ScrapeController = require('./scrape-controller')
const ScrapeService = require('./scrape-imdb-client')

const scrapeService = new ScrapeService(axios)
const scrapeController = new ScrapeController(scrapeService)

const schema = buildSchema(`
  type Movie {
    name: String,
    year: Int
    rating: Float
  }
  
  type Query {
    topRatedMovies(year: Int): [Movie]
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

const root = {
    topRatedMovies: ({year = 2010} = {}) => {
        if (year !== null) {
            return scrapeController.getMoviesMetadata([{name: 'year', value: year}])
        }
    },
    random: () => {
        return Math.random();
    },
    rollDice: function ({numDice, numSides}) {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },
}
module.exports = {
    schema,
    root
}
