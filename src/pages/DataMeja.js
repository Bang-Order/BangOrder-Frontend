import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import PrimaryButton from "../components/button/PrimaryButton";
import DeleteButton from '../components/button/DeleteButton';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Link, Skeleton } from "@mui/material";
import { saveAs } from 'file-saver'
import { api } from "../utils/api";
import Cookies from "js-cookie";
require('dotenv').config();

const useStyle = makeStyles({
    header: {
        display: 'flex',
        left: 'true',
        marginBottom: 20
    },
    actionButton: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    fontStyle: {
        fontWeight: 'normal',
    }
})

const Content = styled('div')(({ theme }) => ({
    backgroundColor: "#ffffff",
    marginLeft: 280,
    marginRight: 20,
    marginTop: 65,
    padding: 25,
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
    },
}));

const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
    paddingTop: 20
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E0E0E0',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f1f1f1',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
});

const DataMeja = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [tables, setTables] = useState();
    const restoId = Cookies.get("RestoId");
    const [table, setTable] = useState();
    const [newTable, SetNewTable] = useState();
    const [addDialog, setAddDialog] = useState();
    const [update, setUpdate] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            api.get(Cookies.get("RestoId") + "/tables", { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
                .then((res) => {
                    setTables(res.data.data);
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }, 300);
    }, [update])

    const editClickHandler = (table) => {
        setTable(table);
        setOpen(true);
    }

    const addClickHandler = () => {
        setAddDialog(true);
        setOpen(true);
    };

    const handleClose = () => {
        setError(false)
        setOpen(false);
    };

    const newTableHandler = (table) => {
        SetNewTable({ table_number: table })
    }

    const saveHandler = () => {
        addDialog ?
            api.post(Cookies.get("RestoId") + '/tables', newTable, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
                .then(() => {
                    setOpen(false)
                    setUpdate(!update)
                    setError(false)
                })
                .catch(() => {
                    setError(true)
                })
            :
            api.patch(Cookies.get("RestoId") + '/tables/' + table.id, newTable, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
                .then(() => {
                    setOpen(false)
                    setUpdate(!update)
                    setError(false)
                })
                .catch(() => {
                    setError(true)
                })
    }

    const deleteClickHandler = (id) => {
        api.delete(Cookies.get("RestoId") + '/tables/' + id, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
            .then(() => {
                setOpen(false)
                setUpdate(!update)
            })
    }

    const dialog = (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{addDialog ? "Tambah Meja" : "Ubah Nomor Meja"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={error}
                    placeholder="Nama meja*"
                    margin="dense"
                    id="name"
                    size="small"
                    fullWidth
                    type="text"
                    defaultValue={table && table.table_number}
                    onChange={(e) => { newTableHandler(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveHandler}>Save</Button>
            </DialogActions>
        </Dialog>
    )

    const download = (table) => {
        saveAs(process.env.REACT_APP_API_URL + "restaurants/" + restoId + "/tables/" + table.id + "/downloadQRCode", 'Meja ' + table.table_number + '.jpg')
    };

    return (
        <Root>
            <Content>
                <div className={classes.header}>
                    <PrimaryButton onClick={addClickHandler}>Tambah Meja</PrimaryButton>
                </div>
                <div className={classes.content}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ width: '30%' }}><h3>Meja</h3></StyledTableCell>
                                    <StyledTableCell sx={{ width: '50%' }} ><h3>QR Code</h3></StyledTableCell>
                                    <StyledTableCell align="center"><h3>Aksi</h3></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ?
                                    <>
                                        <StyledTableRow>
                                            <TableCell colSpan={3}>
                                                <Skeleton animation="wave" variant="h4" width="100%">
                                                    <PrimaryButton>Edit</PrimaryButton>
                                                    <DeleteButton>Hapus</DeleteButton>
                                                </Skeleton>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell colSpan={3}>
                                                <Skeleton animation="wave" variant="h4" width="100%">
                                                    <PrimaryButton>Edit</PrimaryButton>
                                                    <DeleteButton>Hapus</DeleteButton>
                                                </Skeleton>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell colSpan={3}>
                                                <Skeleton animation="wave" variant="h4" width="100%">
                                                    <PrimaryButton>Edit</PrimaryButton>
                                                    <DeleteButton>Hapus</DeleteButton>
                                                </Skeleton>
                                            </TableCell>
                                        </StyledTableRow>
                                    </>
                                    :
                                    tables.length !== 0 ? tables.map((table) => (
                                        <StyledTableRow key={table.id}>
                                            <StyledTableCell component="th" scope="row"><h4 className={classes.fontStyle}>{table.table_number}</h4></StyledTableCell>
                                            <StyledTableCell >
                                                <Link component="h4" onClick={() => download(table)} className={classes.fontStyle}>Unduh disini</Link>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <div className={classes.actionButton}>
                                                    <PrimaryButton onClick={() => editClickHandler(table)}>Edit</PrimaryButton>
                                                    <DeleteButton onClick={() => deleteClickHandler(table.id)}>Hapus</DeleteButton>
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                        :

                                        <StyledTableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                <h4>Belum ada data meja</h4>
                                            </StyledTableCell >
                                            <StyledTableCell sx={{ width: '20%' }} align="center">
                                            </StyledTableCell >
                                        </StyledTableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {dialog}
                </div>
            </Content>
        </Root>
    );
}

export default DataMeja;