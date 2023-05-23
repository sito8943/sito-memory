import { useEffect, useState } from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { useTheme } from "@mui/material/styles";
import Button from "../../components/MUI/Button";
import IconButton from "../../components/MUI/IconButton";
import Typography from "../../components/MUI/Typography";

// @mui icons
import { SentimentDissatisfied, Close } from "@mui/icons-material";

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

  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
    action();
  });

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  const validatePurchase = async () => {
    setLoading(true);
    await onBuy();
    setLoading(false);
    setOpenMenu(false);
  };

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
      <Container
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
            <Close sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
        </Container>
        {loading ? (
          <Container
            justifyContent="center"
            sx={{ width: "100%", height: "100%" }}
          >
            <Loading />
          </Container>
        ) : (
          <>
            <Container
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <SentimentDissatisfied
                sx={{ fontSize: "4rem", color: theme.palette.error.light }}
              />
              <Typography
                variant="h5"
                sx={{ color: theme.palette.error.light }}
              >
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
                onClick={validatePurchase}
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                {languageState.texts.Buttons.BuyCoins}
              </Button>
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
};

BuyCoins.propTypes = {
  visible: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
};

export default BuyCoins;
