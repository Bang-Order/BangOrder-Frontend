import { styled } from '@mui/system';
import React from 'react';
import Sidebar from "../components/sidebar/Sidebar";
import addWeeks from 'date-fns/addWeeks';
import { InputBase } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import HistoryCard from '../components/historycard/HistoryCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    inputBase: {
        border: "2px solid #ffc300",
        borderRadius: 5,
        height: '5vh',
        padding: 5
    },
}))

const Content = styled('div')(({ theme }) => ({
    marginLeft: 280,
    marginRight: 20,
    marginTop: 90,
    padding: 15,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
    },
}));

const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
}))

const Riwayat = () => {
    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined;
    }

    const [value, setValue] = React.useState([null, null]);
    const classes = useStyles();

    return (
        <Root>
            <Sidebar index="5" name="Riwayat" />
            <Content>
                <div style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            disablePast
                            value={value}
                            maxDate={getWeeksAfter(value[0], 4)}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <Box sx={{ mx: 2 }}> Dari </Box>
                                    <InputBase className={classes.inputBase} {...startProps} />
                                    <Box sx={{ mx: 2 }}> Sampai </Box>
                                    <InputBase className={classes.inputBase} {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <HistoryCard />
            </Content>
        </Root>
    );
}

export default Riwayat;