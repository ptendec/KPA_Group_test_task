const {textFileType} = require('../typeDefs/textFile')
const {GraphQLList, GraphQLString} = require('graphql')
const fs = require("fs")
const path = require("path")

const GET_FILES = {
    type: new GraphQLList(textFileType),
    resolve() {
        const pathToDirectory = path.join(__dirname + '../../../data')
        const ListOfFiles = fs.readdirSync(pathToDirectory, 'utf-8')
        const response = [];
        ListOfFiles.map((fileName) => {
            const pathToFile = path.join(__dirname + '../../../data', fileName)
            const textOfFile = fs.readFileSync(pathToFile, 'utf-8')
            response.push({name: fileName.split('.')[0], content: textOfFile})
        })
        return response
    }
}
const READ_DATA = {
    type: textFileType,
    args: {
        name: {type: GraphQLString}
    },
    resolve(parent, args) {
        const {name} = args
        const direction = path.join(__dirname + '../../../data', `${name}.txt`)
        const text = fs.readFileSync(direction, 'utf-8')
        return {name, content: text}
    }
}

module.exports = {GET_FILES, READ_DATA}