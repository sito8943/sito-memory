import React, { Suspense, lazy } from "react";

import "./App.css";
import Board from "./views/Board/Board";
import AudioController from "./components/AudioController/AudioController";

function App() {
  return (
    <div className="App">
      <AudioController />
      <header className="App-header">
        <Board />
      </header>
    </div>
  );
}

export default App;
