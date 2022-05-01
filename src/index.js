import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import App from "./App";

// context
import { LanguageProvider } from "./context/Language";
import { AudioConfigProvider } from "./context/AudioConfig";
import { AudioControllerProvider } from "./context/AudioController";
import { ScoreProvider } from "./context/Score";
import { GameProvider } from "./context/Game";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <LanguageProvider>
      <AudioConfigProvider>
        <AudioControllerProvider>
          <ScoreProvider>
            <GameProvider>
              <App />
            </GameProvider>
          </ScoreProvider>
        </AudioControllerProvider>
      </AudioConfigProvider>
    </LanguageProvider>
  </StrictMode>
);
