import { useEffect, useState } from "react";

// axios
import axios from "axios";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box, Paper, Typography, useTheme } from "@mui/material";

// @mui icons
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

// own components
import Loading from "../../components/Loading/Loading";

// layouts
import SignUp from "../SignUp/SignUp";

// context
import { useLanguage } from "../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const Score = (props) => {
  const { visible } = props;

  const theme = useTheme();
  const { languageState } = useLanguage();

  const [thisUser, setThisUser] = useState("Sito");
  const [players, setPlayers] = useState([
    "Sito",
    "Carlos",
    "Doom",
    "Lesly",
    "Roberto",
    "Mariano",
    "Kiko",
    "Lola",
    "Jaila",
    "Abigail",
    "Eduardo",
    "Dayana",
    "Eliza",
  ]);
  const [openMenu, setOpenMenu] = useState(false);
  const [signed, setSigned] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) setSigned(true);
    else setSigned(false);
  }, []);

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  return (
    <Box
      sx={{
        opacity: openMenu ? 1 : 0,
        zIndex: openMenu ? 99 : -1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(4px)",
        background: "#2222228c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
      }}
    >
      {signed ? (
        <Paper
          sx={{
            padding: "20px",
            width: "320px",
            height: "400px",
            background: "#222333",
            overflowY: "auto",
          }}
          ref={ref}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <SportsScoreIcon sx={{ fontSize: "3rem" }} />
              {languageState.texts.Labels.Score}
              <SportsScoreIcon sx={{ fontSize: "3rem" }} />
            </Typography>
          </Box>
          <Box>
            <Loading
              sx={{
                opacity: players.length ? 0 : 1,
                position: players.length ? "absolute" : "initial",
              }}
            />
            {players.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                {item === thisUser && (
                  <ChevronRight sx={{ color: theme.palette.success.light }} />
                )}
                {i === 0 && (
                  <EmojiEventsIcon
                    sx={{ color: theme.palette.warning.light }}
                  />
                )}

                <Typography
                  variant={i === 0 ? "h4" : "body2"}
                  sx={{
                    margin: "0 10px",
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {i + 1} - {item}
                </Typography>
                {i === 0 && (
                  <EmojiEventsIcon
                    sx={{ color: theme.palette.warning.light }}
                  />
                )}
                {item === thisUser && (
                  <ChevronLeft sx={{ color: theme.palette.success.light }} />
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      ) : (
        <SignUp />
      )}
    </Box>
  );
};

Score.defaultProps = {
  visible: false,
};

Score.propTypes = {
  visible: PropTypes.bool,
};

export default Score;
