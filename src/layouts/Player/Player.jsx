// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box, Typography, useTheme } from "@mui/material";

// @mui icons
import StarsIcon from "@mui/icons-material/Stars";

const Player = (props) => {
  const { points } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 99,
        top: "10px",
        right: "10px",
        display: "flex",
        background: theme.palette.secondary.main,
        padding: "10px",
        width: "70px",
        justifyContent: "right",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          marginRight: "10px",
          marginTop: "1px",
          color: theme.palette.primary.contrastText,
        }}
      >
        {points}
      </Typography>
      <StarsIcon sx={{ color: theme.palette.primary.contrastText }} />
    </Box>
  );
};

Player.defaultProps = {
  points: 0,
};

Player.propTypes = {
  points: PropTypes.number,
};

export default Player;
