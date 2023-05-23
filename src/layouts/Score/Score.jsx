import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

// config
import config from "../../config";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { useTheme } from "@mui/material/styles";
import Box from "../../components/MUI/Box";
import Paper from "../../components/MUI/Paper";
import Button from "../../components/MUI/Button";
import IconButton from "../../components/MUI/IconButton";
import Typography from "../../components/MUI/Typography";

// @mui icons
import {
  Close,
  SportsScore,
  EmojiEvents,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material/";

// own components
import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";

// layouts
import SignUp from "../SignUp/SignUp";

// services
import { FetchFromServer } from "../../services/get";

// context
import { useLanguage } from "../../context/Language";

const Score = (props) => {
  const { visible, action } = props;

  const theme = useTheme();
  const { languageState } = useLanguage();

  const [error, setError] = useState(-1);
  const [thisUser, setThisUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [signed, setSigned] = useState(false);

  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
    action();
  });

  useEffect(() => {
    const user = localStorage.getItem("memory-user");
    if (user !== null) {
      init();
      setThisUser(user);
      setSigned(true);
    } else setSigned(false);
  }, []);

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  const init = async () => {
    setError(-1);
    const data = await FetchFromServer("score", { idApp: config.appName });
    if (data.error) setError(0);
    else {
    }
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
          width: "320px",
          height: "400px",
          background: "#222333",
          overflowY: "auto",
        }}
        ref={ref}
      >
        <Container
          sx={{
            marginTop: -10,
            width: 320,
            position: "absolute",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={action}>
            <Close sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
        </Container>
        {signed ? (
          <>
            <Container alignItems="center" justifyContent="center">
              <Typography
                variant="h3"
                sx={{ color: theme.palette.primary.contrastText }}
              >
                <SportsScore sx={{ fontSize: "3rem" }} />
                {languageState.texts.Labels.Score}
                <SportsScore sx={{ fontSize: "3rem" }} />
              </Typography>
            </Container>
            <Box>
              <Loading
                sx={{
                  opacity: players.length || error !== -1 ? 0 : 1,
                  position:
                    players.length || error !== -1 ? "absolute" : "initial",
                }}
              />
              {error !== -1 && (
                <Container flexDirection="column" alignItems="center">
                  <Typography
                    textAlign="center"
                    sx={{ color: theme.palette.error.light, margin: "10px" }}
                  >
                    {languageState.texts.Errors[error]}
                  </Typography>
                  <Button variant="contained" onClick={() => init()}>
                    {languageState.texts.Buttons.Retry}
                  </Button>
                </Container>
              )}
              {players.map((item, i) => (
                <Container
                  key={i}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ margin: "10px" }}
                >
                  {item.name === thisUser && (
                    <ChevronRight sx={{ color: theme.palette.success.light }} />
                  )}
                  {i === 0 && (
                    <EmojiEvents sx={{ color: theme.palette.warning.light }} />
                  )}

                  <Typography
                    variant={i === 0 ? "h4" : "body2"}
                    sx={{
                      margin: "0 10px",
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {i + 1} - {item.name} - {item.points}
                  </Typography>
                  {i === 0 && (
                    <EmojiEvents sx={{ color: theme.palette.warning.light }} />
                  )}
                  {item.name === thisUser && (
                    <ChevronLeft sx={{ color: theme.palette.success.light }} />
                  )}
                </Container>
              ))}
            </Box>
          </>
        ) : (
          <SignUp sx={{ height: "100%" }} />
        )}
      </Container>
    </Container>
  );
};

Score.defaultProps = {
  visible: false,
};

Score.propTypes = {
  visible: PropTypes.bool,
  action: PropTypes.func.isRequired,
};

export default Score;
