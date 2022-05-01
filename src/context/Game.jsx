/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const GameContext = React.createContext();

const gameReducer = (gameState, action) => {
  switch (action.type) {
    case "difficulty":
      return {
        difficulty: action.to,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const GameProvider = ({ children }) => {
  const [gameState, setGameState] = React.useReducer(gameReducer, {
    difficulty: false,
  });

  const value = { gameState, setGameState };
  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined)
    throw new Error("gameContext must be used within a Provider");
  return context;
};

export { GameProvider, useGame };
