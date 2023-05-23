// tippy
import Tippy from "@tippyjs/react";

// prop types
import PropTypes from "prop-types";

// @mui
import Button from "../../components/MUI/Button";

// @mui icons
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

//context
import { useLanguage } from "../../context/Language";

const BuyCard = (props) => {
  const { action } = props;
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
        onClick={action}
      >
        <AutoFixHighIcon />
      </Button>
    </Tippy>
  );
};

BuyCard.propTypes = {
  action: PropTypes.func.isRequired,
};

export default BuyCard;
