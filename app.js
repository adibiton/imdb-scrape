'use strict'
const express = require('express')
const routes = require('./routes/routes')
const PORT = process.env.PORT || 3001
const app = express()

app.use(routes)
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

module.exports = app
