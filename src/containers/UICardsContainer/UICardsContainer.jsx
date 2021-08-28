import React from "react";
import PropTypes from "prop-types";
import UICard from "src/components/UICard/UICard";
import { Grid } from "@material-ui/core";

const UICardsContainer = ({ cards }) => {
  return (
    <Grid container spacing={4}>
      {cards.map((card) => (
        <Grid
          key={card.id}
          item
          xs={12}
          md={true}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <UICard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

UICardsContainer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default UICardsContainer;
