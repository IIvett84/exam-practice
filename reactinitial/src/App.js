import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Title from "./components/Title";
import LoadingMask from "./components/LoadingMask";
import Character from "./components/Character";
import Subscription from "./components/Subscription";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [showSubscription, setShowSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const LoadingTimer = setTimeout(() => {
       fetch("https://demoapi.com/api/series/howimetyourmother")
      .then((response) => response.json())
      .then((response) => {setCharacters(response);
      setIsLoading(false);
    })
     .catch((err) => {console.log(err);
      setIsLoading(false);
  });
}, 5000);
const subscriptionTimer = setTimeout(() => {
      setShowSubscription(true);
    }, 15000);
    return () => {
      clearTimeout(LoadingTimer);
      clearTimeout(subscriptionTimer);
  };
 }, []);

  return (
    <Box>
      <Title />
      {isLoading ? (
        <LoadingMask />
      ) : (
        <Box>
          {characters.map((character) => (
            <Character
              key={character.id}
              name={character.name}
              details={character.details}
            />
          ))}
        </Box>
      )}
      {showSubscription && <Subscription />}
    </Box>
  );
};

export default App;
