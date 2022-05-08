// prop types
import PropTypes from "prop-types";

// tippy
import Tippy from "@tippyjs/react";

// @mui components
import { Button } from "@mui/material";

// @mui icons
import SettingsIcon from "@mui/icons-material/Settings";

//context
import { useLanguage } from "../../context/Language";

const About = (props) => {
  const { action } = props;
  const { languageState } = useLanguage();

  return (
    <Tippy content={languageState.texts.Tooltips.About}>
      <Button
        sx={{
          position: "fixed",
          zIndex: 99,
          bottom: "10px",
          left: "10px",
          padding: "10px",
          transition: "all 400ms ease",
          opacity: 0.2,
          minWidth: "30px",
          background: "#222",
          "&:hover": {
            opacity: 1,
          },
        }}
        variant="contained"
        onClick={action}
      >
        <SettingsIcon />
      </Button>
    </Tippy>
  );
};

About.propTypes = {
  action: PropTypes.func.isRequired,
};

export default About;
