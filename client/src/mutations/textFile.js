import {gql} from "@apollo/client"

export const WRITE_FILE = gql`
    mutation writeFile($name: String!, $content: String!){
            writeFile(name: $name, content: $content){
                name, content
            }
    }
    
`