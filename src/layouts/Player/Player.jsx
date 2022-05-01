// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Button, Typography, useTheme } from "@mui/material";

// @mui icons
import StarsIcon from "@mui/icons-material/Stars";

// context
import { useLanguage } from "../../context/Language";
import { useScore } from "../../context/Score";

const Player = (props) => {
  const { points } = props;
  const theme = useTheme();

  const { languageState } = useLanguage();
  const { setScoreState } = useScore();

  return (
    <Tippy content={languageState.texts.Tooltips.Points}>
      <Button
        sx={{
          position: "fixed",
          zIndex: 99,
          top: "10px",
          right: "10px",
          display: "flex",
          background: theme.palette.secondary.main,
          padding: "10px",
          width: "90px",
          justifyContent: "right",
          transition: "all 400ms ease",
          opacity: 0.2,
          "&:hover": {
            opacity: 1,
          },
        }}
        variant="contained"
        onClick={() => setScoreState({ type: "toggle" })}
        color="secondary"
      >
        <Typography
          sx={{
            marginRight: "10px",
            marginTop: "1px",
          }}
        >
          {points}
        </Typography>
        <StarsIcon />
      </Button>
    </Tippy>
  );
};

Player.defaultProps = {
  points: 0,
};

Player.propTypes = {
  points: PropTypes.number,
};

export default Player;
