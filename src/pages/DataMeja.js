import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { styled } from '@mui/material/styles';
import PrimaryButton from "../components/button/PrimaryButton";
import DeleteButton from '../components/button/DeleteButton';
import TertiaryButton from '../components/button/TertiaryButton';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Link } from "@mui/material";

const useStyle = makeStyles({
    content: {
        display: 'flex',
        left: 'true',
        paddingTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    actionButton: {
        display: 'flex',
        justifyContent: 'space-around'
    }
})

const Content = styled('div')(({ theme }) => ({
    backgroundColor: "#ffffff",
    marginLeft: 280,
    marginRight: 20,
    marginTop: 90,
    padding: 25,
    borderRadius: 7,
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
    },
}));

const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E0E0E0',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f1f1f1',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, code, action) {
    return { name, code, action };
}

const rows = [
    createData('1', 'Unduh disini'),
    createData('2', 'Unduh disini'),
    createData('3', 'Unduh disini'),
    createData('4', 'Unduh disini'),
    createData('5', 'Unduh disini'),
];




const DataMeja = () => {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const editClickHandler = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const dialog = (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Meja</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    size="small"
                    fullWidth
                    type="text"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button>Save</Button>
            </DialogActions>
        </Dialog>
    )

    const download = () => {
        var element = document.createElement("a");
        var file = new Blob(
            [
                "https://metroandalas.co.id/wp-content/uploads/2021/10/04-scan-qr-740x414.jpeg"
            ],
            { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
    };

    return (
        <Root>
            <Sidebar index="2" name="Data Meja" />
            <Content>
                <div className={classes.content}>
                    <PrimaryButton>Tambah Meja</PrimaryButton>
                </div>
                <div className={classes.content}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ width: '40%' }}><h3>Meja</h3></StyledTableCell>
                                    <StyledTableCell sx={{ width: '40%' }}><h3>QR Code</h3></StyledTableCell>
                                    <StyledTableCell align="center"><h3>Aksi</h3></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                        <StyledTableCell><Link href="https://metroandalas.co.id/wp-content/uploads/2021/10/04-scan-qr-740x414.jpeg"
                                            download
                                            onClick={() => download()}>{row.code}</Link></StyledTableCell>
                                        <StyledTableCell>
                                            <div className={classes.actionButton}>
                                                <TertiaryButton onClick={editClickHandler}>Edit</TertiaryButton>
                                                <DeleteButton>Hapus</DeleteButton>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
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