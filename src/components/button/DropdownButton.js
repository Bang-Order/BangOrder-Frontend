import { Button } from "@mui/material";
import { styled } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DropdownButton = (props) => {
    const BootstrapButton = styled(Button)({
        backgroundColor: '#fff',
        border: 'solid',
        borderWidth: 1,
        borderRadius: 7, 
        width: props.width,
        marginTop: 20,
        marginBottom: 20,
        fontSize: '16px',
        fontFamily: 'manrope',
        textTransform: "capitalize",
        fontWeight: "bolder",
        color: "#191E24",
        '&:hover': {
            backgroundColor: '#FFD755',
            color: '#191E24',
        },
        '&:disabled': {
            backgroundColor: '#FFD755',
        },
    })
    console.log(props);
    return (
        <BootstrapButton {...props} >
            {props.children}
            <ArrowDropDownIcon />
        </BootstrapButton>
    );
}

export default DropdownButton;