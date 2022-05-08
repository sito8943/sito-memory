import { useEffect, useState } from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { useTheme, Box, Button, Paper, Typography } from "@mui/material";

// @mui icons
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";

// own components
import Container from "../../components/Container/Container";

// contexts
import { useLanguage } from "../../context/Language";
import { useAudioConfig } from "../../context/AudioConfig";
import useOnclickOutside from "react-cool-onclickoutside";

const SettingDialog = (props) => {
  const { languageState } = useLanguage();
  const { audioConfigState, setAudioConfigState } = useAudioConfig();
  const theme = useTheme();

  const [openMenu, setOpenMenu] = useState(false);

  const { visible } = props;

  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
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
          width: "320px",
          height: "400px",
          background: "#222333",
          overflowY: "auto",
        }}
        ref={ref}
      >
        <Container justifyContent="center">
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            {languageState.texts.Labels.Settings}
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};

SettingDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default SettingDialog;
