// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// @mui components
import { Button } from "@mui/material";

// @mui icons
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

//context
import { useLanguage } from "../../context/Language";

const BuyCard = () => {
  const { languageState } = useLanguage();

  return (
    <Tippy content={languageState.texts.Tooltips.BuyCard}>
      <Button
        sx={{
          position: "fixed",
          zIndex: 99,
          bottom: "10px",
          right: "10px",
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
        onClick={() => window.location.reload()}
      >
        <AutoFixHighIcon />
      </Button>
    </Tippy>
  );
};

export default BuyCard;
