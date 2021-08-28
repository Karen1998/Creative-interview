import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const LeaderBoardContext = createContext([]);

function leaderBoardReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const addNewWinnerAction = ({ name, time: SubmittedTime }) => ({
  type: "add",
  payload: { name, time: new Date() - SubmittedTime },
});

const LeaderboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leaderBoardReducer, []);
  const value = { state, dispatch };

  return (
    <LeaderBoardContext.Provider value={value}>
      {children}
    </LeaderBoardContext.Provider>
  );
};

LeaderboardProvider.propTypes = {
  children: PropTypes.node,
};

export const useDispatch = () => {
  const context = React.useContext(LeaderBoardContext);

  return context.dispatch;
};

export default LeaderboardProvider;
