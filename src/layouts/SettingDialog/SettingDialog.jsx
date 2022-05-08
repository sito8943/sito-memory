import { useEffect, useState } from "react";

// css
import { css } from "@emotion/css";

// prop-types
import PropTypes from "prop-types";

// @mui components
import {
  useTheme,
  Paper,
  Typography,
  Button,
  IconButton,
  Link,
} from "@mui/material";

// @mui icons
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import CloseIcon from "@mui/icons-material/Close";

// own components
import Container from "../../components/Container/Container";

// layouts
import SignUp from "../SignUp/SignUp";

// contexts
import { useLanguage } from "../../context/Language";
import { useAudioConfig } from "../../context/AudioConfig";
import useOnclickOutside from "react-cool-onclickoutside";

const SettingDialog = (props) => {
  const { languageState } = useLanguage();
  const { audioConfigState, setAudioConfigState } = useAudioConfig();
  const theme = useTheme();

  const [openMenu, setOpenMenu] = useState(false);

  const { visible, action } = props;

  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
    action();
  });

  useEffect(() => {
    setOpenMenu(visible);
  }, [visible]);

  const photo = css({
    width: "36px",
    height: "36px",
    background: "#222",
    borderRadius: "100%",
    margin: "0 10px",
  });

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
            width: 260,
            position: "absolute",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={action}>
            <CloseIcon sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
        </Container>
        <Container justifyContent="center">
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            {languageState.texts.Labels.Settings}
          </Typography>
        </Container>
        <Container
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: "20px 0", width: "100%" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.primary.contrastText,
              marginRight: "20px",
            }}
          >
            {languageState.texts.Labels.Audio}
          </Typography>{" "}
          <Button
            color="primary"
            variant="outlined"
            sx={{ borderRadius: "100%", padding: "5px", minWidth: 0 }}
            onClick={() => setAudioConfigState({ type: "toggle-audio" })}
          >
            {audioConfigState.sfx ? <MusicNoteIcon /> : <MusicOffIcon />}
          </Button>
        </Container>
        <Container flexDirection="column" sx={{ margin: "10px 0" }}>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.contrastText,
              textAlign: "center",
              width: "100%",
            }}
          >
            {languageState.texts.About.AppName}
          </Typography>
          <Container alignItems="center" sx={{ margin: "20px 0 10px 0" }}>
            <Typography
              sx={{
                color: theme.palette.primary.contrastText,
                marginRight: "10px",
              }}
            >
              {languageState.texts.About.Version.Title}
            </Typography>
            <Link
              color="primary"
              rel="noopener"
              target="_blank"
              href={languageState.texts.About.Version.Link}
            >
              {languageState.texts.About.Version.Name}
            </Link>
          </Container>

          <Container alignItems="center" sx={{ margin: "10px 0" }}>
            <Typography
              sx={{
                color: theme.palette.primary.contrastText,
                marginRight: "10px",
              }}
            >
              {languageState.texts.About.MainIdea.Title}
            </Typography>
            <Link
              color="primary"
              rel="noopener"
              target="_blank"
              href={languageState.texts.About.MainIdea.Link}
            >
              {languageState.texts.About.MainIdea.Name}
            </Link>
          </Container>
          <Container alignItems="center" sx={{ margin: "10px 0" }}>
            <Typography
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              {languageState.texts.About.Developer.Title}
            </Typography>
            <Link
              sx={{ display: "flex", alignItems: "center" }}
              color="primary"
              rel="noopener"
              target="_blank"
              href={languageState.texts.About.Developer.Link}
            >
              <img
                className={photo}
                src={languageState.texts.About.Developer.Photo}
                alt="sito"
              />
              {languageState.texts.About.Developer.Name}
            </Link>
          </Container>
        </Container>
        <SignUp justIcon />
      </Paper>
    </Container>
  );
};

SettingDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

export default SettingDialog;
