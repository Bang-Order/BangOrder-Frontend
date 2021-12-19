import { styled } from '@mui/material/styles';
import CanvasJSReact from '../lib/canvasjs.react';
import { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { api } from "../utils/api";
import Cookies from "js-cookie";
import { Skeleton } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import PrimaryButton from '../components/button/PrimaryButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {  Dialog, DialogActions, DialogContent, DialogTitle, InputBase, InputLabel, Link } from "@mui/material";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    backgroundColor: '#fff',
    padding: 10,
    textAlign: "left",
    width: "100%"
  },
  summary: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 10,
    textAlign: "left"
  },
  chart: {
    backgroundColor: '#fff'
  },
  overview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%"
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
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'transparent', //theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b'
    // border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 0px',
    marginLeft: 5,
    width: '380px',
  },
}));

const Restoran = () => {
  const classes = useStyles();
  const [data, setData] = useState();
  const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  // const [today, setToday] = useState(new Date().getDay().toLocaleString(['id']) + new Date().toLocaleString(['id']));
  const [today] = useState(day[new Date().getDay()] + ", " + new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear());
  const dataPoints = [];
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [setAddDialog] = useState();
  const [resto, setResto] = useState();
  const Frame = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    marginLeft: 280,
    marginRight: 20,
    marginTop: 65,
    padding: 25,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
  }));
  const Content = styled('div')(({ theme }) => ({
    marginLeft: 280,
    marginRight: 20,
    marginTop: 20,
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
  }));

  const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
    paddingBottom: 20,
    paddingTop: 20
  }))

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const takeClickHandler = () => {
    api.get(Cookies.get("RestoId"))
      .then((res) => {
        setResto(res.data)
      })
    setAddDialog(true);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    api.get(Cookies.get("RestoId") + "/dashboard", { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
      .then((res) => {
        setData(res.data)
        for (var i = 0; i < res.data.income_data.length; i++) {
          const date = new Date();
          let tanggal = res.data.income_data[i].date.split("-")
          date.setDate(tanggal[0])
          date.setMonth(tanggal[1] - 1)
          date.setFullYear(tanggal[2])
          dataPoints.push({
            x: date,
            y: parseInt(res.data.income_data[i].total_income)
          });
        }
        setOptions({
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Pendapatan Restoran"
          },
          axisY: {
            title: "Pendapatan",
          },
          data: [{
            type: "line",
            xValueFormatString: "DD MMM",
            dataPoints: dataPoints
          }]
        })
        setLoading(false);
      })
  }, [])

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ margin: 0 }}><h4>Tarik Dana</h4></DialogTitle>
      <DialogContent>
        <InputLabel style={{ fontSize: 16, marginLeft: 10 }}>
          Nominal Tarik
        </InputLabel>
        <div className={classes.inputWrapper}>
          <div className={classes.prefix}>
            Rp
          </div>
          <div>
            <BootstrapInput
              placeholder="0"
              id="rupiah"
              name="rupiah-nominal"
              type="number"
            />
          </div>

        </div>
        <h3 className={classes.dialogTitle}>Kirim ke &nbsp;
          <Link href="/akun"><EditOutlinedIcon style={{ fontSize: 'medium', color: '#BCBCBC' }} /> </Link>
        </h3>
        {/* <DialogTitle style={{ margin: 0 }}><EditOutlinedIcon /></DialogTitle> */}
        <div style={{ marginLeft: 10, marginTop: 0 }}>
          <p style={{ fontSize: 14, margin: 0 }}>Nama (harus sama dengan Rekening Bank)</p>
          <h4>{resto && resto.account_holder_name}</h4>
        </div>
        <div style={{ marginTop: 15, marginLeft: 10 }}>
          <p style={{ fontSize: 14, margin: 0 }}>Bank</p>
          <h4>{resto && resto.bank_name}</h4>
        </div>
        <div style={{ marginTop: 15, marginLeft: 10 }}>
          <p style={{ fontSize: 14, margin: 0 }}>No. Rekening</p>
          <h4>{resto && resto.account_number}</h4>
        </div>
        <div className={classes.note}>
          Setiap melakukan transaksi, saldo akan dipotong sebesar Rp 5000.
          Waktu dana akan sampai ke pengguna bergantung pada waktu pemrosesan bank.
          Informasi selengkapnya silahkan &nbsp;
          <a href='https://rebrand.ly/Limit-dan-Waktu' rel="noreferrer" target='_blank'>klik disini</a>.
        </div>
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={handleClose} style={{ marginRight: 15, marginBottom: 10 }}>Tarik</PrimaryButton>
      </DialogActions>
    </Dialog >
  )

  return (
    <Root>
      {/* <Sidebar index="0" name="Restoran" /> */}
      <Frame>
        <CanvasJSChart options={options} />
      </Frame>
      <Content>
        {loading
          ?
          <div className={classes.date}>
            <Skeleton>
              <h3>{today}</h3>
            </Skeleton>
            <div className={classes.overview}>
              <div className={classes.order}>
                <Skeleton><h4>Pesanan hari ini</h4></Skeleton>
                <Skeleton><h3>222</h3></Skeleton>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.income}>
                <Skeleton><h4>Pendapatan hari ini</h4></Skeleton>
                <Skeleton><h3>120000</h3></Skeleton>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.saldo}>
                <Skeleton><h4>Saldo</h4></Skeleton>
                <Skeleton><h3>120000</h3></Skeleton>
              </div>
            </div>
          </div>
          :
          <>
            <div className={classes.date}>
              <div className={classes.header}>
                <h3>{today}</h3>
                <PrimaryButton onClick={takeClickHandler} style={{ marginRight: 10, fontSize: 16 }}>Tarik dana</PrimaryButton>
              </div>
              <div className={classes.overview}>
                <div className={classes.order}>
                  <h4>Pesanan hari ini</h4>
                  <h3>{data.today_data.total_order}</h3>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.income}>
                  <h4>Pendapatan hari ini</h4>
                  <h3>Rp. {data.today_data.total_income.toLocaleString(['id'])}</h3>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.saldo}>
                  <h4>Saldo</h4>
                  <h3>Rp. {data.total_balance.toLocaleString(['id'])}</h3>
                </div>
              </div>
            </div>
            <div className={classes.summary}>
              <h3>Ringkasan</h3>
              <div className={classes.summaryTable}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} stickyHeader aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell ><h3>Tanggal</h3></StyledTableCell>
                        <StyledTableCell align="center"><h3>Jumlah Pesanan</h3></StyledTableCell>
                        <StyledTableCell align="center"><h3>Pendapatan</h3></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.income_data.length !== 0 ? data.income_data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <StyledTableRow
                            // key={category.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <StyledTableCell component="th" scope="row">
                              <h4>{row.date}</h4>
                            </StyledTableCell >
                            <StyledTableCell align="center">
                              <h4>{row.total_order}</h4>
                            </StyledTableCell >
                            <StyledTableCell align="center">
                              <h4>Rp. {row.total_income.toLocaleString(['id'])}</h4>
                            </StyledTableCell >
                          </StyledTableRow>
                        ))
                        :
                        <StyledTableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <StyledTableCell component="th" scope="row">
                            <h4>Data kosong</h4>
                          </StyledTableCell >
                          <StyledTableCell align="center">
                          </StyledTableCell >
                          <StyledTableCell align="center">
                          </StyledTableCell >
                        </StyledTableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                {dialog}
                {/* showPagination={data.length > 10 ? true : false} */}

                {data.income_data.length !== 0 &&
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                }
              </div>
              <div className={classes.summaryTable} style={{ marginTop: 20 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell ><h3>Tanggal</h3></StyledTableCell>
                        <StyledTableCell><h3>Jumlah Pengeluaran</h3></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.withdraw_data.length !== 0 ? data.withdraw_data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <StyledTableRow
                            // key={category.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <StyledTableCell component="th" scope="row">
                              <h4>{row.time}</h4>
                            </StyledTableCell >
                            <StyledTableCell align="center">
                              <h4>Rp. {row.amount.toLocaleString(['id'])}</h4>
                            </StyledTableCell >
                          </StyledTableRow>
                        ))
                        :
                        <StyledTableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <StyledTableCell component="th" scope="row">
                            <h4>Data kosong</h4>
                          </StyledTableCell >
                          <StyledTableCell align="center">
                          </StyledTableCell >
                        </StyledTableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                {data.income_data.length !== 0 &&
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />}
              </div>
            </div>
          </>
        }
      </Content>
    </Root>

  );
}

export default Restoran;