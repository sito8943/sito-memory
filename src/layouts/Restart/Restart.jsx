// prop-types
import PropTypes from "prop-types";

// @mui components
import { Button, Typography, useTheme } from "@mui/material";

// @mui icons
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const Restart = (props) => {
  const { points } = props;
  const theme = useTheme();
  return (
    <Button
      sx={{
        position: "fixed",
        zIndex: 99,
        top: "10px",
        left: "10px",
        padding: "10px",
        transition: "all 400ms ease",
        opacity: 0.2,
        minWidth: "30px",
        "&:hover": {
          opacity: 1,
        },
      }}
      variant="contained"
      color="secondary"
      onClick={() => window.location.reload()}
    >
      <RotateLeftIcon />
    </Button>
  );
};

Restart.defaultProps = {
  points: 0,
};

Restart.propTypes = {
  points: PropTypes.number,
};

export default Restart;
