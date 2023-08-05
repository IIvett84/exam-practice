import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const Character = ({ name, details }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  /* const handleShowLess = () => {
    setShowMore(false);
  } */

  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "clamp(280px, 26vw, 480px)",
        border: 1,
        padding: "1rem",
        borderRadius: "1rem",
      }}
    >
      <Box>
        <Typography>{name}</Typography>
        {!showMore && (
          <Button variant="outlined" onClick={handleShowMore}>
            Show more
          </Button>
        )}
        {showMore && (
          <Button variant="outlined" onClick={handleShowMore}>
            Show less
          </Button>
        )}
        {showMore && <Box>{details}</Box>}
      </Box>
    </Box>
  );
};

export default Character;
