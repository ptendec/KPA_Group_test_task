import React, {useEffect, useState} from 'react'
import classes from "./Main.module.css"
import {Container, Grid, Stack, TextField} from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import {useLazyQuery, useMutation, useQuery} from "@apollo/client"
import {GET_FILES, READ_DATA} from "../../query/textFile"
import {WRITE_FILE} from "../../mutations/textFile"


const Main = () => {
    const [inputTextFileName, setInputTextFileName] = useState('')
    const [inputTextFileContent, setInputTextFileContent] = useState('')
    const [listOfTextFileNames, setListOfTextFileNames] = useState([])
    const {data: responseGetFiles, loading: loadingOfGetFiles, refetch} = useQuery(GET_FILES)
    const [readData, {data: responseOfReadData, loading: loadingOfReadData}] = useLazyQuery(READ_DATA)
    const [writeFile, {data, loading}] = useMutation(WRITE_FILE)


    useEffect(() => {
        if (!loadingOfGetFiles) {
            setListOfTextFileNames(responseGetFiles.getFiles)
        }
    }, [responseGetFiles, loadingOfGetFiles])

    const textFileNameClickHandler = (event) => {
        setInputTextFileName(event.target.value)
        readData({variables: {name: event.target.value}})
            .then((response) => {
                setInputTextFileContent(response.data.readData.content)
            })
    }
    const saveClickHandler = () => {
        writeFile({variables: {name: inputTextFileName, content: inputTextFileContent}})
            .then((response) => {
            refetch()
        })
    }
    return (
        <div className={classes.main}>
            <Container maxWidth={'xl'}>
                <Grid container spacing={2}>
                    <Grid item xl={8} lg={8} md={8}>
                        <Stack spacing={2} direction={'column'}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Write text file name"
                                value={inputTextFileName}
                                onChange={(event) => {
                                    setInputTextFileName(event.target.value)
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Write text file content"
                                placeholder="Placeholder"
                                value={inputTextFileContent}
                                onChange={(event) => {
                                    setInputTextFileContent(event.target.value)
                                }}
                                multiline
                            />
                            <Button
                                sx={{
                                    height: '56px',
                                    fontSize: '20px',
                                    textTransform: 'none'
                                }}
                                variant="contained"
                                onClick={() => {saveClickHandler()}}

                            >Save</Button>
                        </Stack>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4}>
                        <TableContainer component={Paper}>
                            <Table sx={{width: '100%', textAlign: 'center'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{textAlign: 'center'}}><b>Table name</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listOfTextFileNames.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell sx={{textAlign: 'center'}} component="th"
                                                       scope="row">
                                                <Button
                                                    value={row.name}
                                                    variant="text"
                                                    onClick={(event) => {
                                                        textFileNameClickHandler(event)
                                                    }}
                                                >{row.name}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Main