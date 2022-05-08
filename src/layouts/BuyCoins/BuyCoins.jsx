import { useEffect, useState } from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Button, IconButton, Paper, Typography, useTheme } from "@mui/material";

// @mui icons
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import CloseIcon from "@mui/icons-material/Close";

// own components
import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";

// context
import { useLanguage } from "../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const BuyCoins = (props) => {
  const { visible, action, onBuy } = props;

  const theme = useTheme();
  const { languageState } = useLanguage();

  const [openMenu, setOpenMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
    action();
  });

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      sx={{
        opacity: openMenu ? 1 : 0,
        zIndex: openMenu ? 99 : -1,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(4px)",
        background: "#2222228c",
        transition: "all 400ms ease",
      }}
    >
      <Paper
        sx={{
          padding: "20px",
          width: "250px",
          height: "200px",
          background: "#222333",
          overflowY: "auto",
        }}
        ref={ref}
      >
        <Container
          sx={{
            marginTop: -10,
            width: 260,
            position: "absolute",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={action}>
            <CloseIcon sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
        </Container>
        <Container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <SentimentDissatisfiedIcon
            sx={{ fontSize: "4rem", color: theme.palette.error.light }}
          />
          <Typography variant="h5" sx={{ color: theme.palette.error.light }}>
            {languageState.texts.Labels.Ups}
          </Typography>
        </Container>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.contrastText,
            textAlign: "center",
            width: "center",
            margin: "10px 0",
          }}
        >
          {languageState.texts.Labels.BuyCoins}
        </Typography>
        <Container
          justifyContent="center"
          sx={{ width: "100%", margin: "15px 0 10px 0" }}
        >
          <Button
            onClick={onBuy}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            {languageState.texts.Buttons.BuyCoins}
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

BuyCoins.propTypes = {
  visible: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
};

export default BuyCoins;
