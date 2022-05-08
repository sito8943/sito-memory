// prop types
import PropTypes from "prop-types";

// @mui components
import { IconButton, Button, Tooltip } from "@mui/material";

// @mui icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// own components
import Container from "../../components/Container/Container";

// tippy
import Tippy from "@tippyjs/react";

// context
import { useLanguage } from "../../context/Language";
import { forwardRef } from "react";

const SignUp = forwardRef((props, ref) => {
  const { languageState } = useLanguage();

  const { sx, justIcon } = props;

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={sx}
    >
      {justIcon ? (
        <Tippy content={languageState.texts.Buttons.Login}>
          <IconButton color="primary">
            <VpnKeyIcon color="info" sx={{ fontSize: "4rem" }} />
          </IconButton>
        </Tippy>
      ) : (
        <>
          <VpnKeyIcon
            color="info"
            sx={{ marginBottom: "20px", fontSize: "4rem" }}
          />

          <Button
            sx={{ textTransform: "none" }}
            target="_blank"
            rel="noopener"
            variant="contained"
            href="https://www.facebook.com"
          >
            {languageState.texts.Buttons.Login}
          </Button>
        </>
      )}
    </Container>
  );
});

SignUp.defaultProps = {
  sx: {},
  justIcon: false,
};

SignUp.propTypes = {
  sx: PropTypes.object,
  justIcon: PropTypes.bool,
};

export default SignUp;
