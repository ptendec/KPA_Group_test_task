import {gql} from "@apollo/client"

export const GET_FILES = gql`
    query {
        getFiles{
            name
        }
    }
`

export const READ_DATA = gql`
    query readData($name: String!){
        readData(name: $name){
            name, content
        }
    }
    
`
