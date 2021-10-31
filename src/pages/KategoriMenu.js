import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from "@mui/system";
import Sidebar from "../components/sidebar/Sidebar";
import axios from 'axios';
import { GET_RESTAURANT } from "../utils/Urls";
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputAdornment, IconButton, TextField, Menu, MenuItem, Skeleton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
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

const KategoriMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [allCategory, setAllCategory] = useState();
  const restoId = localStorage.getItem("RestoId");
  const [searchKey, setSearchKey] = useState();
  const [newCategory, setNewCategory] = useState();
  const [addDialog, setAddDialog] = useState();
  const [category, setCategory] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios.get(GET_RESTAURANT + restoId + '/menu-categories')
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
      axios.post(GET_RESTAURANT + restoId + '/menu-categories', newCategory, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
        .then(setOpen(false))
        .then(setUpdate(!update))
      :
      axios.patch(GET_RESTAURANT + restoId + '/menu-categories/' + category.id, newCategory, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
        .then(setOpen(false))
        .then(setUpdate(!update))
  }

  const deleteHandler = (id) => {
    axios.delete(GET_RESTAURANT + restoId + '/menu-categories/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
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
          <div className={classes.left}>
            <TextField onChange={(e) => setSearchKey(e.target.value)} className="search" size="small" type="text" placeholder="Cari kategori"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end"><SearchIcon /></IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={classes.right}>
            <PrimaryButton onClick={addClickHandler}>Tambah Kategori</PrimaryButton>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '75%' }}><h3>Kategori Menu</h3></TableCell>
                <TableCell align="center"><h3>Aksi</h3></TableCell>
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
                  <TableRow
                    key={category.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <h4>{category.name}</h4>
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.actionButton}>
                        <SecondaryButton onClick={() => { editClickHandler(category) }}>Edit</SecondaryButton>
                        <PrimaryButton onClick={() => { deleteHandler(category.id) }}>Hapus</PrimaryButton>
                      </div>
                    </TableCell>
                  </TableRow>
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