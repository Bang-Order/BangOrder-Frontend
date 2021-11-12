import { Button } from "@mui/material";
import { styled } from "@mui/system";

const DeleteButton = (props) => {
  const BootstrapButton = styled(Button)({
    backgroundColor: '#FF4E00',
    border: 'solid',
    borderWidth: 1,
    borderRadius: 7,
    width: props.width,
    fontSize: '16px',
    fontFamily: 'manrope',
    textTransform: "capitalize",
    fontWeight: "bolder",
    color: "#fff",
    '&:hover': {
      backgroundColor: '#FF7133',
      // borderWidth: 3,
    },
    '&:disabled': {
      backgroundColor: '#FF7133',
    },
  })
  return (
    <BootstrapButton {...props} />
  );
}

export default DeleteButton;