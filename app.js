'use strict'
const express = require('express')
const scrape = require('./src')
const PORT = process.env.PORT || 3001
const app = express()

app.use(scrape)
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

module.exports = app
