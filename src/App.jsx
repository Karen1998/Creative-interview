import React, { useContext, useState } from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";

import CardsContainer from "./containers/Cards/CardsContainer";
import { LeaderBoardContext } from "./services/Leaderboard";
import LeaderBoard from "./containers/LeaderBoard/LeaderBoard";

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const leaderBoardContext = useContext(LeaderBoardContext);

  const handleStartNewGame = () => {
    setStartGame(false);
  };

  return (
    <Container>
      {startGame ? (
        <CardsContainer
          startTime={new Date()}
          handleStartNewGame={handleStartNewGame}
        />
      ) : (
        <Button onClick={() => setStartGame(true)}>
          Click me to start the game
        </Button>
      )}

      <Box mt={5}>
        <Typography variant="h2">Leader Board</Typography>

        <LeaderBoard leaderBoard={leaderBoardContext.state} />
      </Box>
    </Container>
  );
};

export default App;
