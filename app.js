'use strict'
const express = require('express')
const graphqlHTTP = require('express-graphql')

const {routes, schema, root} = require('./src')
const PORT = process.env.PORT || 3001
const app = express()

app.use(routes)
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

module.exports = app
