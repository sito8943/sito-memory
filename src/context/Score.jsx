/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const ScoreContext = React.createContext();

const scoreReducer = (scoreState, action) => {
  switch (action.type) {
    case "toggle":
      console.log(scoreState.score);
      return {
        score: !scoreState.score,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ScoreProvider = ({ children }) => {
  const [scoreState, setScoreState] = React.useReducer(scoreReducer, {
    score: false,
  });

  const value = { scoreState, setScoreState };
  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useScore = () => {
  const context = React.useContext(ScoreContext);
  if (context === undefined)
    throw new Error("scoreContext must be used within a Provider");
  return context;
};

export { ScoreProvider, useScore };
