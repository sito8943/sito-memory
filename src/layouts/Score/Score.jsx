import { useEffect, useState } from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box, Paper, Typography, useTheme } from "@mui/material";

// @mui icons
import SportsScoreIcon from "@mui/icons-material/SportsScore";

// context
import { useLanguage } from "../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const Score = (props) => {
  const { visible } = props;

  const theme = useTheme();
  const { languageState } = useLanguage();

  const [openMenu, setOpenMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  return (
    <Box
      sx={{
        opacity: openMenu ? 1 : 0,
        zIndex: openMenu ? 99 : -1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(4px)",
        background: "#2222228c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
      }}
    >
      <Paper
        sx={{
          padding: "20px",
          width: "300px",
          height: "400px",
          background: "#222333",
        }}
        ref={ref}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <SportsScoreIcon sx={{ fontSize: "3rem" }} />
            {languageState.texts.Labels.Score}
            <SportsScoreIcon sx={{ fontSize: "3rem" }} />
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

Score.defaultProps = {
  visible: false,
};

Score.propTypes = {
  visible: PropTypes.bool,
};

export default Score;
