import Sidebar from "../components/sidebar/Sidebar";
import { styled } from '@mui/material/styles';
import CanvasJSReact from '../lib/canvasjs.react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@mui/material";
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
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const useStyles = makeStyles(() => ({
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

const Restoran = () => {
  const classes = useStyles();
  const [data, setData] = useState();
  const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  // const [today, setToday] = useState(new Date().getDay().toLocaleString(['id']) + new Date().toLocaleString(['id']));
  const [today, setToday] = useState(day[new Date().getDay()] + ", " + new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear());
  const dataPoints = [];
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(true);
  const Frame = styled('div')(({ theme }) => ({
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
    paddingBottom: 20
  }))

  useEffect(() => {
    api.get(Cookies.get("RestoId") + "/dashboard", { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
      .then((res) => {
        setData(res.data)
        for (var i = 0; i < res.data.data.length; i++) {
          const date = new Date();
          let tanggal = res.data.data[i].date.split("-")
          date.setDate(tanggal[0])
          date.setMonth(tanggal[1] - 1)
          date.setFullYear(tanggal[2])
          dataPoints.push({
            x: date,
            y: parseInt(res.data.data[i].total_income)
          });
        }
        console.log(dataPoints);
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

  return (
    <Root>
      <Sidebar index="0" name="Restoran" />
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
              <h3>{today}</h3>
              <div className={classes.overview}>
                <div className={classes.order}>
                  <h4>Pesanan hari ini</h4>
                  <h3>{data.today_data.total_order}</h3>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.income}>
                  <h4>Pendapatan hari ini</h4>
                  <h3>{data.today_data.total_income}</h3>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.saldo}>
                  <h4>Saldo</h4>
                  <h3>-</h3>
                </div>
              </div>
            </div>
            <div className={classes.summary}>
              <h3>Ringkasan</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell ><h3>Tanggal</h3></StyledTableCell>
                      <StyledTableCell align="center"><h3>Jumlah Pesanan</h3></StyledTableCell>
                      <StyledTableCell align="center"><h3>Pendapatan</h3></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.map((row) => (
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
                          <h4>{row.total_income}</h4>
                        </StyledTableCell >
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        }
      </Content>
    </Root>

  );
}

export default Restoran;