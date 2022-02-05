const {textFileType} = require('../typeDefs/textFile')
const {GraphQLString} = require('graphql')
const fs = require('fs')
const path = require("path")

const WRITE_FILE = {
    type: textFileType,
    args: {
        name: {type: GraphQLString},
        content: {type: GraphQLString}
    },
    resolve(parent, args) {
        const {name, content} = args
        const pathToFile = path.join(__dirname + '../../../data', name + '.txt')
        fs.writeFileSync(pathToFile, content)
        return args

    }
}

module.exports = {WRITE_FILE}