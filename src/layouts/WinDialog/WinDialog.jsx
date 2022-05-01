import { useEffect, useState } from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { useTheme, Box, Button, Paper, Typography } from "@mui/material";

// @mui icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// context
import { useLanguage } from "../../context/Language";
import { useReward } from "react-rewards";

const WinDialog = (props) => {
  const { languageState } = useLanguage();
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const theme = useTheme();

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
      document.getElementById("click").click();
    }, 400);
  }, [finished]);

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(4px)",
        background: "#2222228c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <EmojiEventsIcon
            sx={{
              marginBottom: "20px",
              fontSize: "4rem",
              color: theme.palette.warning.light,
            }}
          />
          <Typography variant="h3" color="primary">
            {languageState.texts.Labels.Congratulations}
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
              ? languageState.texts.Labels.CongratulationsDescription
              : languageState.texts.Labels.CongratulationsSignUp}
          </Typography>

          {signed ? (
            <Button variant="contained">
              {languageState.texts.Buttons.Reload}
            </Button>
          ) : (
            <Button
              variant="contained"
              target="_blank"
              rel="noopener"
              href="https://www.facebook.com"
            >
              {languageState.texts.Buttons.Login}
            </Button>
          )}
        </Box>
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
    </Box>
  );
};

WinDialog.defaultProps = {
  sx: {},
};

WinDialog.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  finished: PropTypes.bool.isRequired,
};

export default WinDialog;
