import { Button } from "@mui/material";
import { styled } from "@mui/system";

const SecondaryButton = (props) => {
    const BootstrapButton = styled(Button)({
        backgroundColor: '#fff',
        border: 'solid',
        borderWidth: 1,
        borderRadius: 7,
        width: props.width,
        fontSize: '18px',
        fontFamily: 'manrope',
        textTransform: "capitalize",
        fontWeight: "bolder",
        color: "#191E24",
        '&:hover': {
            backgroundColor: '#FFD755',
            // borderWidth: 3,
        },
        '&:disabled': {
            backgroundColor: '#FFD755',
        },
    })
    return (
        <BootstrapButton {...props} />
    );
}

export default SecondaryButton;