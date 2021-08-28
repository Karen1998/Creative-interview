import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

const Card = ({ image, show, win, handleClick }) => {
  return (
    <Box
      position="relative"
      flex={1}
      height="100%"
      borderRadius={5}
      overflow="hidden"
      onClick={handleClick}
      style={{
        cursor: "pointer",
      }}
    >
      <Box
        position="absolute"
        width={1}
        height={1}
        zIndex={9}
        opacity={win ? 1 : 0}
        style={{
          backgroundColor: win ? "#fff" : "transparent",
          pointerEvents: "none",
          transition: "opacity 350ms ease-out, background-color 350ms ease-out",
        }}
      />

      {show ? (
        <Box width="100%" height="100%">
          <img src={image} alt="" />
        </Box>
      ) : (
        <Box
          width="100%"
          height="100%"
          style={{
            backgroundColor: "#000",
          }}
        />
      )}
    </Box>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  show: PropTypes.bool,
  win: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Card;
