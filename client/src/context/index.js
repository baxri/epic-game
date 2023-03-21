import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import MyEpicGameJson from "../abi/MyEpicGame.json";
import useAccount from "../hooks/useAccount";
const CONTRACT_ADDRESS = "0xAaba1b056aBd1375681fE6E07F8f328aAbA216AE";

// import MyEpicGameJson from "../abi/MyEpicGameLocal.json";
// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractMetadata = {
  address: CONTRACT_ADDRESS,
  abi: MyEpicGameJson.abi,
};

// Create the context
const GameContext = createContext();

// Create a provider component
export function GameProvider(props) {
  const [mintIndex, setMintIndex] = React.useState(null);

  const { address } = useAccount();

  const { data: getBigBossresponse } = useContractRead({
    ...contractMetadata,
    functionName: "getBigBoss",
    watch: true,
  });

  const { data: checkIfUserHasNFTResponse } = useContractRead({
    ...contractMetadata,
    functionName: "checkIfUserHasNFT",
    overrides: { from: address },
    watch: true,
  });

  const { data: getAllDefaultCharactersResponse } = useContractRead({
    ...contractMetadata,
    functionName: "getAllDefaultCharacters",
  });

  const { config } = usePrepareContractWrite({
    ...contractMetadata,
    functionName: "mintCharacterNFT",
    args: [mintIndex],
    enabled: mintIndex !== null,
  });

  const {
    data: mintData,
    writeAsync: mint,
    isLoading: isMintStarted,
  } = useContractWrite(config);

  const { isSuccess: isMintSuccess, isLoading: isMintLoading } =
    useWaitForTransaction({
      hash: mintData?.hash,
    });

  useContractEvent({
    ...contractMetadata,
    eventName: "AttackComplete",
    listener(state) {
      if (state === 0) {
        toast.success("Attack completed! you got  50hp reward");
      } else if (state === 1) {
        toast.error("You missed! :(");
      } else {
        toast.error("Boss is dead!");
      }
    },
  });

  const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toNumber(),
      maxHp: characterData.maxHp.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };

  const bigBoss = useMemo(() => {
    return getBigBossresponse?.name
      ? transformCharacterData(getBigBossresponse)
      : null;
  }, [getBigBossresponse]);

  const characterNFT = useMemo(() => {
    return checkIfUserHasNFTResponse?.name
      ? transformCharacterData(checkIfUserHasNFTResponse)
      : null;
  }, [checkIfUserHasNFTResponse]);

  const characters = useMemo(() => {
    return getAllDefaultCharactersResponse?.map((characterData) =>
      transformCharacterData(characterData)
    );
  }, [getAllDefaultCharactersResponse]);

  const { config: attackConfig } = usePrepareContractWrite({
    ...contractMetadata,
    functionName: "attackBoss",
    enabled: characterNFT?.hp > 0,
  });

  const {
    data: attackData,
    writeAsync: attack,
    isLoading: isAttackStarted,
  } = useContractWrite(attackConfig);

  const { isSuccess: isAttackSuccess, isLoading: isAttackLoading } =
    useWaitForTransaction({
      hash: attackData?.hash,
    });

  const { config: buyConfig } = usePrepareContractWrite({
    ...contractMetadata,
    functionName: "buyHp",
    overrides: {
      value: ethers.utils.parseEther("0.001"),
    },
    enabled: !!characterNFT?.name,
  });

  const {
    data: buyData,
    writeAsync: buy,
    isLoading: isBuyStarted,
  } = useContractWrite(buyConfig);

  const { isSuccess: isBuySuccess, isLoading: isBuyLoading } =
    useWaitForTransaction({
      hash: buyData?.hash,
    });

  const handleMintCharacter = async (index) => {
    setMintIndex(index);
  };

  const handleBuy = async () => {
    try {
      await buy();
    } catch (err) {
      alert(err.message);
    }
  };
  const handleAttack = async () => {
    try {
      await attack();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (mintIndex !== null) {
      const starMinting = async () => {
        try {
          await mint();
        } catch (err) {
          setMintIndex(null);
        }
      };

      starMinting();
    }
  }, [mintIndex]);

  return (
    <GameContext.Provider
      value={{
        characterNFT,
        bigBoss,
        characters,
        mintIndex,
        buyState: {
          isBuyStarted,
          isBuyLoading,
          isBuySuccess,
        },
        attackState: {
          isAttackStarted,
          isAttackLoading,
          isAttackSuccess,
        },
        mintState: {
          isMintStarted,
          isMintLoading,
          isMintSuccess,
        },
        handleMintCharacter,
        handleAttack,
        handleBuy,
      }}
    >
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
