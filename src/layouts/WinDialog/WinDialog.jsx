import React, { memo, useMemo, useEffect, useState } from "react";
import { useReward } from "react-rewards";

// prop-types
import PropTypes from "prop-types";

// @mui
import { useTheme } from "@mui/material/styles";
import Typography from "../../components/MUI/Typography";
import Button from "../../components/MUI/Button";
import Paper from "../../components/MUI/Paper";

// @mui icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// own components
import Container from "../../components/Container/Container";

// context
import { useLanguage } from "../../context/Language";

const WinDialog = (props) => {
  const { languageState } = useLanguage();
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const theme = useTheme();

  const { Labels, Buttons } = useMemo(() => {
    return {
      Labels: languageState.texts.Labels,
      Buttons: languageState.texts.Buttons,
    };
  }, [languageState]);

  const { sx, finished } = props;

  const [thisUser, setThisUser] = useState("");
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("memory-user");
    if (user !== null) {
      setThisUser(user);
      setSigned(true);
    } else setSigned(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("click")?.click();
    }, 400);
  }, [finished]);

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(4px)",
        background: "#2222228c",
        transition: "all 400ms ease",
        ...sx,
      }}
    >
      <Paper
        sx={{
          transition: "all 400ms ease",
          transform: finished ? "scale(1)" : "scale(0)",
          padding: "20px",
          width: "320px",
          height: "400px",
          background: "#222333",
          overflowY: "auto",
          position: "absolute",
        }}
      >
        <Container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <EmojiEventsIcon
            sx={{
              marginBottom: "20px",
              fontSize: "4rem",
              color: theme.palette.warning.light,
            }}
          />
          <Typography variant="h3" color="primary">
            {Labels.Congratulations}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              margin: "20px 0",
              color: theme.palette.primary.contrastText,
            }}
            variant="body1"
          >
            {signed
              ? Labels.CongratulationsDescription
              : Labels.CongratulationsSignUp}
          </Typography>

          {signed ? (
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
            >
              {Buttons.Reload}
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                target="_blank"
                rel="noopener"
                href="https://www.facebook.com"
              >
                {Buttons.Login}
              </Button>
              <Button
                sx={{ marginTop: "10px" }}
                onClick={() => window.location.reload()}
                variant="contained"
              >
                {Buttons.Reload}
              </Button>
            </>
          )}
        </Container>
      </Paper>
      <button
        style={{
          visibility: "hidden",
        }}
        id="click"
        disabled={isAnimating}
        onClick={reward}
      >
        Test
      </button>
      <div style={{ zIndex: 99 }} id="rewardId"></div>
    </Container>
  );
};

WinDialog.defaultProps = {
  sx: {},
};

WinDialog.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  finished: PropTypes.bool.isRequired,
};

const WinDialogMemo = memo((props) => <WinDialog {...props} />, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return oldProps.sx === newProps.sx && oldProps.finished === newProps.finished;
}

export default WinDialogMemo;
