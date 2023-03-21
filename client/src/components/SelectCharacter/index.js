import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useGameContext } from "../../context";
import useAccount from "../../hooks/useAccount";

const SelectCharacter = () => {
  const {
    characters,
    handleMintCharacter,
    mintIndex,
    mintState: { isMintStarted, isMintLoading },
  } = useGameContext();

  const isMinting = isMintStarted || isMintLoading;

  return (
    <div className="select-character-container px-4">
      <h2 className="text-white text-center branded-text text-2xl mb-6">
        Mint Your Hero. Choose wisely.
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 max-w-4xl m-auto gap-4">
        {characters?.map(({ name, imageURI }, index) => {
          return (
            <div key={index} className="flex flex-col  relative cursor-pointer">
              <h2 className="branded-text absolute bg-white px-2 rounded-md left-2 top-2">
                {name}
              </h2>
              <img
                src={imageURI}
                alt={name}
                className="w-100 object-cover h-80 rounded-t-lg"
              />
              {isMinting && mintIndex !== index && (
                <div className="w-full h-full absolute bg-black opacity-50"></div>
              )}
              <button
                onClick={() => {
                  if (!isMinting) {
                    handleMintCharacter(index);
                  }
                }}
                className={classNames(
                  "bg-primary text-white branded-text w-full py-2 rounded-b-lg"
                )}
              >
                {isMinting && mintIndex === index
                  ? "Minting NFT"
                  : `Mint ${name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCharacter;
