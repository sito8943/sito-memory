import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import App from "./App";
import { LanguageProvider } from "./context/Language";
import { AudioConfigProvider } from "./context/AudioConfig";
import { AudioControllerProvider } from "./context/AudioController";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <LanguageProvider>
      <AudioConfigProvider>
        <AudioControllerProvider>
          <App />
        </AudioControllerProvider>
      </AudioConfigProvider>
    </LanguageProvider>
  </StrictMode>
);
