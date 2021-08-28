import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useStyles } from "./styles";

const UICard = ({ attributes, relationships }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const recipeNameFirstLetter = relationships.attributes.first_name
    .charAt(0)
    .toUpperCase();

  const houseData = {
    city: `г.${attributes.address.city}`,
    street: `ул.${attributes.address.street}`,
    house: `дом ${attributes.address.house}`,
    room: attributes.address.room ? `кв.${attributes.address.room}` : "",
  };

  const userData = {
    firstName: relationships.attributes.first_name,
    lastName: relationships.attributes.last_name,
    middleName: relationships.attributes.middle_name,
  };

  const handleExpandClick = () => {
    setExpanded((pS) => !pS);
  };

  const handleToggleLike = () => {
    setLiked((pS) => !pS);
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {recipeNameFirstLetter}
          </Avatar>
        }
        title={`${userData.firstName} ${userData.lastName} ${userData.middleName}`}
        subheader={relationships.type}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Название - ${attributes.title}`}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {`Количество комнат - ${attributes.rooms}`}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {`Адресс - ${houseData.city} ${houseData.street} ${houseData.house} ${houseData.room}`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleToggleLike}>
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Площадь - ${attributes.area} ${attributes.unit}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

UICard.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  attributes: PropTypes.shape({
    title: PropTypes.string,
    rooms: PropTypes.number,
    area: PropTypes.number,
    unit: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      house: PropTypes.string,
      room: PropTypes.string,
    }),
  }),
  relationships: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.number,
    attributes: PropTypes.shape({
      last_name: PropTypes.string,
      first_name: PropTypes.string,
      middle_name: PropTypes.string,
    }),
  }),
};

export default UICard;
