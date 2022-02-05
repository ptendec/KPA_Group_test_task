const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const {GET_FILES, READ_DATA} = require('./queries/textFile')
const {WRITE_FILE} = require('./mutations/textFile')


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getFiles: GET_FILES,
        readData: READ_DATA
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        writeFile: WRITE_FILE,

    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

module.exports = schema