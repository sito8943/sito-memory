import React, { memo, useMemo } from "react";

// prop types
import PropTypes from "prop-types";

// tippy
import Tippy from "@tippyjs/react";

// @mui
import Button from "../../components/MUI/Button";

// @mui icons
import SettingsIcon from "@mui/icons-material/Settings";

//context
import { useLanguage } from "../../context/Language";

const About = (props) => {
  const { action } = props;
  const { languageState } = useLanguage();

  const about = useMemo(() => {
    return languageState.texts.Tooltips.About;
  }, [languageState]);

  return (
    <Tippy content={about}>
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

const AboutMemo = memo((props) => <About {...props} />, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return oldProps.action === newProps.action;
}

export default AboutMemo;
