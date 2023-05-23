import React, { memo, useMemo } from "react";

// prop types
import PropTypes from "prop-types";

// tippy
import Tippy from "@tippyjs/react";

// @mui
import Button from "../../components/MUI/Button";
import IconButton from "../../components/MUI/IconButton";

// @mui icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// own components
import Container from "../../components/Container/Container";

// context
import { useLanguage } from "../../context/Language";

const SignUp = (props) => {
  const { languageState } = useLanguage();

  const { sx, justIcon } = props;

  const { Buttons } = useMemo(() => {
    return { Buttons: languageState.texts.Buttons };
  }, [languageState]);

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={sx}
    >
      {justIcon ? (
        <Tippy content={Buttons.Login}>
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
            {Buttons.Login}
          </Button>
        </>
      )}
    </Container>
  );
};

SignUp.defaultProps = {
  sx: {},
  justIcon: false,
};

SignUp.propTypes = {
  sx: PropTypes.object,
  justIcon: PropTypes.bool,
};

const SignUpMemo = memo((props) => <SignUp {...props} />, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return oldProps.sx === newProps.sx && oldProps.justIcon === newProps.justIcon;
}

export default SignUpMemo;
