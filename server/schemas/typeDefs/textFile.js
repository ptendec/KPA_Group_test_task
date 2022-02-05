const {GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql')

const textFileType = new GraphQLObjectType({
    name: 'textFile',
    fields: () => ({
        name: {type: GraphQLString},
        content: {type: GraphQLString}
    })
})

module.exports = {textFileType}