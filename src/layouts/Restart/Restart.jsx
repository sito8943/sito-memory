// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Button } from "@mui/material";

// @mui icons
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

//context
import { useLanguage } from "../../context/Language";

const Restart = (props) => {
  const { languageState } = useLanguage();

  return (
    <Tippy content={languageState.texts.Tooltips.Restart}>
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
    </Tippy>
  );
};

Restart.defaultProps = {
  points: 0,
};

Restart.propTypes = {
  points: PropTypes.number,
};

export default Restart;
