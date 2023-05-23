import React, { Suspense, lazy } from "react";

// styles
import "./App.css";
import Board from "./views/Board/Board";
const AudioController = lazy(() =>
  import("./components/AudioController/AudioController")
);

function App() {
  return (
    <Suspense>
      <div className="App">
        <AudioController />
        <header className="App-header">
          <Board />
        </header>
      </div>
    </Suspense>
  );
}

export default App;
