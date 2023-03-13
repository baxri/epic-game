import React, { useEffect, useState } from "react";
import { useGameContext } from "../../context";
import useAccount from "../../hooks/useAccount";

const SelectCharacter = ({ setCharacterNFT }) => {
  const { isConnected } = useAccount();
  const { myState } = useGameContext();

  if (!isConnected) return null;

  return (
    <div className="select-character-container">
      <h2 className="text-white text-center">Mint Your Hero. Choose wisely.</h2>
    </div>
  );
};

export default SelectCharacter;
