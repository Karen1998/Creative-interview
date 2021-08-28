import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";

import CardsContainer from "./containers/GameCards/GameCardsContainer";
import { LeaderBoardContext } from "./services/Leaderboard";
import LeaderBoard from "./containers/LeaderBoard/LeaderBoard";

const Game = () => {
  const [startGame, setStartGame] = useState(false);
  const leaderBoardContext = useContext(LeaderBoardContext);

  const handleStartNewGame = () => {
    setStartGame(false);
  };

  return (
    <Box>
      {startGame ? (
        <Box mt={10}>
          <CardsContainer
            startTime={new Date()}
            handleStartNewGame={handleStartNewGame}
          />
        </Box>
      ) : (
        <Button onClick={() => setStartGame(true)}>
          Click me to start the game
        </Button>
      )}

      <Box mt={5}>
        <Typography variant="h2">Leader Board</Typography>

        <LeaderBoard leaderBoard={leaderBoardContext.state} />
      </Box>
    </Box>
  );
};

Game.propTypes = {};

export default Game;
