import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import { cards } from "src/store/entities";
import Card from "src/components/GameCard/GameCard";
import { useDispatch } from "src/services/Leaderboard";
import { addNewWinnerAction } from "src/services/Leaderboard";

const TIME_OUT_DURATION = 5000;
let timeout;

const addPropertyToArray = (arr) => {
  return arr.map((card) => ({
    ...card,
    show: false,
    win: false,
  }));
};

const GameCardsContainer = ({ startTime, handleStartNewGame }) => {
  const [cardsState, setCardsState] = useState(() => addPropertyToArray(cards));
  const [disabledMouseEvents, setDisabledMouseEvents] = useState(false);

  const dispatch = useDispatch();

  const selectedCardsRef = useRef([]);
  const winnersCompareIdsRef = useRef([]);

  const closeAllCards = () => {
    setCardsState((prevState) =>
      prevState.map((prevCard) => {
        if (winnersCompareIdsRef.current.includes(prevCard.compareId)) {
          return prevCard;
        }

        return {
          ...prevCard,
          show: false,
        };
      })
    );

    selectedCardsRef.current = [];
  };

  const checkForWin = () => {
    if (winnersCompareIdsRef.current.length === cardsState.length / 2) {
      submitWin();
      handleStartNewGame();
    }
  };

  const submitWin = () => {
    alert("Congratulations, U win");
    const name = prompt("Please enter u'r name");

    dispatch(
      addNewWinnerAction({
        name,
        time: startTime,
      })
    );
  };

  const handleCardClick = (cardId) => {
    clearTimeout(timeout);

    setCardsState(
      cardsState.map((card) => {
        if (card.win) {
          return card;
        }

        if (card.id === cardId) {
          const isCardNeedToBeShow = !card.show;

          const updatedCard = {
            ...card,
            show: isCardNeedToBeShow,
          };

          if (isCardNeedToBeShow) {
            selectedCardsRef.current = [
              ...selectedCardsRef.current,
              updatedCard,
            ];
          }

          return updatedCard;
        }

        return card;
      })
    );

    timeout = setTimeout(() => {
      closeAllCards();
    }, TIME_OUT_DURATION);
  };

  useEffect(() => {
    const sl = selectedCardsRef.current;

    if (sl.length === 2) {
      const [firstSelectedCard, secondSelectedCard] = sl;

      if (firstSelectedCard.compareId === secondSelectedCard.compareId) {
        winnersCompareIdsRef.current = [
          ...winnersCompareIdsRef.current,
          firstSelectedCard.compareId,
        ];

        setCardsState((prevState) =>
          prevState.map((prevCard) => {
            if (winnersCompareIdsRef.current.includes(prevCard.compareId)) {
              return {
                ...prevCard,
                win: true,
              };
            }

            return {
              ...prevCard,
              show: false,
            };
          })
        );

        selectedCardsRef.current = [];

        checkForWin();
      } else {
        setDisabledMouseEvents(true);

        setTimeout(() => {
          closeAllCards();
          setDisabledMouseEvents(false);
        }, 350);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardsRef.current]);

  return (
    <Box
      style={{
        pointerEvents: disabledMouseEvents ? "none" : "all",
      }}
    >
      <Grid container spacing={3}>
        {cardsState.map((card, index) => (
          <Grid key={index + card.id} item xs={3}>
            <Box height={150}>
              <Card
                image={card.image}
                show={card.show}
                win={card.win}
                handleClick={() => handleCardClick(card.id)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

GameCardsContainer.propTypes = {
  startTime: PropTypes.object,
  handleStartNewGame: PropTypes.func,
};

export default GameCardsContainer;
