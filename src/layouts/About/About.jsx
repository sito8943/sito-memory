// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// @mui components
import { Button } from "@mui/material";

// @mui icons
import InfoIcon from "@mui/icons-material/Info";

//context
import { useLanguage } from "../../context/Language";

const About = (props) => {
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
          "&:hover": {
            opacity: 1,
          },
        }}
        variant="contained"
        color="secondary"
        onClick={() => window.location.reload()}
      >
        <InfoIcon />
      </Button>
    </Tippy>
  );
};

export default About;
