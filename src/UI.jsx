import React, { useEffect, useState } from "react";
import UICardsContainer from "./containers/UICardsContainer/UICardsContainer";
import { Box } from "@material-ui/core";

const UI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const getData = async () => {
    try {
      const { response } = await fetch("entities.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());

      setIsLoading(false);
      setCards(response);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 0);
  }, []);

  return (
    <Box mt={10}>
      {isLoading ? "Loading ... " : <UICardsContainer cards={cards} />}
    </Box>
  );
};

export default UI;
