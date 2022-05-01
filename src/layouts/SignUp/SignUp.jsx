// @mui components
import { Box, Button, Paper } from "@mui/material";

// @mui icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// context
import { useLanguage } from "../../context/Language";
import { forwardRef } from "react";

const SignUp = forwardRef((props, ref) => {
  const { languageState } = useLanguage();

  return (
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <VpnKeyIcon
          color="info"
          sx={{ marginBottom: "20px", fontSize: "4rem" }}
        />
        <Button
          target="_blank"
          rel="noopener"
          variant="contained"
          href="https://www.facebook.com"
        >
          {languageState.texts.Buttons.Login}
        </Button>
      </Box>
    </Paper>
  );
});

export default SignUp;
