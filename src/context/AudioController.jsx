import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  switch (action.type) {
    case "good": {
      let newGood = 1;
      if (audioControllerState.good === 1) newGood = 2;
      return {
        ...audioControllerState,
        good: newGood,
      };
    }
    case "error": {
      let newError = 1;
      if (audioControllerState.error === 1) newError = 2;
      return {
        ...audioControllerState,
        error: newError,
      };
    }
    case "normal-click": {
      let newNormalClick = 1;
      if (audioControllerState.normalClick === 1) newNormalClick = 2;
      return {
        ...audioControllerState,
        normalClick: newNormalClick,
      };
    }
    case "pop-up": {
      let newPopUp = 1;
      if (audioControllerState.popUp === 1) newPopUp = 2;
      return {
        ...audioControllerState,
        popUp: newPopUp,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AudioControllerProvider = ({ children }) => {
  const [audioControllerState, setAudioControllerState] = React.useReducer(
    audioControllerReducer,
    {
      error: 0,
      popUp: 0,
      normalClick: 0,
    }
  );

  const value = { audioControllerState, setAudioControllerState };
  return (
    <AudioController.Provider value={value}>
      {children}
    </AudioController.Provider>
  );
};

//hooks
const useAudioController = () => {
  const audioController = React.useContext(AudioController);
  if (audioController === undefined)
    throw new Error("useAudioController must be used within a Provider");
  return audioController;
};

export { AudioControllerProvider, useAudioController };
