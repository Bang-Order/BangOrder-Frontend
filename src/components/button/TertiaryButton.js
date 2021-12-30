import { Button } from "@mui/material";
import { styled } from "@mui/system";

const TertiaryButton = (props) => {
  const BootstrapButton = styled(Button)({
    backgroundColor: '#ffc300',
    borderWidth: 1,
    borderRadius: 7,
    width: props.width,
    fontSize: '16px',
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

export default TertiaryButton;