import React from "react";

// tippy
import Tippy from "@tippyjs/react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import Button from "../../components/MUI/Button";
import Typography from "../../components/MUI/Typography";

// @mui icons
import { Stars } from "@mui/icons-material/";

// context
import { useLanguage } from "../../context/Language";

const Player = (props) => {
  const { points, action } = props;

  const { languageState } = useLanguage();

  return (
    <Tippy content={languageState.texts.Tooltips.Points}>
      <Button
        sx={{
          position: "fixed",
          zIndex: 99,
          top: "10px",
          right: "10px",
          display: "flex",
          padding: "10px",
          width: "90px",
          justifyContent: "right",
          transition: "all 400ms ease",
          opacity: 0.2,
          background: "#222",
          "&:hover": {
            opacity: 1,
          },
        }}
        variant="contained"
        onClick={action}
      >
        <Typography
          sx={{
            marginRight: "10px",
            marginTop: "1px",
          }}
        >
          {points}
        </Typography>
        <Stars />
      </Button>
    </Tippy>
  );
};

Player.defaultProps = {
  points: 0,
};

Player.propTypes = {
  points: PropTypes.number,
  action: PropTypes.func.isRequired,
};

export default Player;
