import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from "@mui/system";
import Sidebar from "../components/sidebar/Sidebar";
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import TertiaryButton from '../components/button/TertiaryButton';
import DeleteButton from '../components/button/DeleteButton';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Skeleton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { api } from '../utils/api';

const Content = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  marginLeft: 280,
  marginRight: 20,
  marginTop: 90,
  padding: 25,
  paddingBottom: 20,
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
  },
}));

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  minHeight: '100vh',
}))

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    left: 'true',
    marginBottom: 20
},
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 39,
    width: "30%",
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));


const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E0E0',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f1f1f1',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});

const KategoriMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [allCategory, setAllCategory] = useState();
  const [newCategory, setNewCategory] = useState();
  const [addDialog, setAddDialog] = useState();
  const [category, setCategory] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      api.get('/menu-categories')
        .then((res) => {
          setAllCategory(res.data.data);
          setLoading(false);
        })
    }, 400);
  }, [update])

  const addClickHandler = () => {
    setAddDialog(true);
    setOpen(true);
  };

  const editClickHandler = (id) => {
    setAddDialog(false);
    setCategory(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setCategory();
  };

  const newCategoryHandler = (value) => {
    setNewCategory({ name: value })
  }

  const saveHandler = () => {
    addDialog ?
      api.post('/menu-categories', newCategory)
        .then(setOpen(false))
        .then(setUpdate(!update))
      :
      api.patch('/menu-categories/' + category.id, newCategory)
        .then(setOpen(false))
        .then(setUpdate(!update))
  }

  const deleteHandler = (id) => {
    api.delete('/menu-categories/' + id)
      .then(setOpen(false))
      .then(setUpdate(!update))
  }
  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{addDialog ? "Tambah Kategori Menu" : "Ubah Kategori Menu"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          size="small"
          fullWidth
          defaultValue={category ? category.name : ""}
          onChange={(e) => { newCategoryHandler(e.target.value) }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  )
  return (
    <Root>
      <Sidebar index="3" name="Kategori Menu" />
      <Content>
        <div className={classes.header}>
            <PrimaryButton onClick={addClickHandler}>Tambah Kategori</PrimaryButton>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: '75%' }}><h3>Kategori Menu</h3></StyledTableCell>
                <StyledTableCell align="center"><h3>Aksi</h3></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ?
                <>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Skeleton animation="wave" variant="h4" width="100%">
                        <SecondaryButton>Edit</SecondaryButton>
                        <PrimaryButton>Hapus</PrimaryButton>
                      </Skeleton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Skeleton animation="wave" variant="h4" width="100%">
                        <SecondaryButton>Edit</SecondaryButton>
                        <PrimaryButton>Hapus</PrimaryButton>
                      </Skeleton>
                    </TableCell>
                  </TableRow>
                </>
                :
                allCategory && allCategory.map((category) => (
                  <StyledTableRow
                    key={category.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell  component="th" scope="row">
                      <h4>{category.name}</h4>
                    </StyledTableCell >
                    <StyledTableCell sx={{ width: '20%' }} align="center">
                      <div className={classes.actionButton}>
                        <TertiaryButton  onClick={() => { editClickHandler(category) }}>Edit</TertiaryButton >
                        <DeleteButton  onClick={() => { deleteHandler(category.id) }}>Hapus</DeleteButton >
                      </div>
                    </StyledTableCell >
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {dialog}
      </Content>
    </Root>
  );
}

export default KategoriMenu;