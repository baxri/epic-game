import React, { createContext, useContext, useState } from "react";

// Create the context
const GameContext = createContext();

// Create a provider component
export function GameProvider(props) {
  const [characterNFT, setCharacterNFT] = useState(null);
  const [myState, setMyState] = useState("sdsdsdsd");

  return (
    <GameContext.Provider value={{ myState, setMyState }}>
      {props.children}
    </GameContext.Provider>
  );
}

// Create a custom hook to use the context
export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
}
