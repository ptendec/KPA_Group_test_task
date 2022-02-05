require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const {graphql} = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schemas/index')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'data')))
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))


app.listen(5000)