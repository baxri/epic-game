import React from "react";
import { useGameContext } from "../../context";

const Arena = () => {
  const { bigBoss, characterNFT, handleAttack, attackState } = useGameContext();

  const { name, imageURI, hp, maxHp } = bigBoss;
  const {
    name: nftName,
    imageURI: nftImageURI,
    hp: nftHp,
    maxHp: nftMaxHp,
  } = characterNFT;

  const isAttacking =
    attackState.isAttackStarted || attackState.isAttackLoading;
  const isDead = nftHp <= 0;

  return (
    <div>
      <h2 className="text-white text-center branded-text text-2xl mb-6">
        You can attack this damn bloater.
      </h2>
      <div className="max-w-4xl mx-auto gap-16 flex flex-col md:flex-row justify-center items-center select-character-container px-4">
        <div className=" w-full flex items-center justify-center flex-col  relative cursor-pointer rounded-md border-2">
          <h2 className="branded-text absolute bg-white px-2 rounded-md left-2 top-2">
            {nftName}
          </h2>
          <img
            src={nftImageURI}
            alt={nftName}
            className="w-full object-cover rounded-t-lg rounded-lg"
          />
          <p className="branded-text absolute bg-white px-2 rounded-md left-2 bottom-2 text-lg">
            HEALTH: {nftHp} / {nftMaxHp} HP
          </p>
          {isDead && (
            <div className="absolute w-full h-full bg-primary opacity-50 justify-center items-center flex ">
              <h1 className="text-white text-8xl branded-text font-bold text-center">
                GAME OVER
              </h1>
            </div>
          )}
        </div>

        {!isDead && (
          <button
            className="bg-primary py-4 px-6 branded-text text-white rounded-md"
            onClick={handleAttack}
          >
            {isAttacking ? "Attacking!" : "Attack"}
          </button>
        )}

        {!isDead && (
          <div className="w-full flex items-center justify-center flex-col  relative cursor-pointer rounded-md border-2">
            <h2 className="branded-text absolute bg-white px-2 rounded-md left-2 top-2">
              {name}
            </h2>
            <img
              src={imageURI}
              alt={name}
              className="w-full object-cover  rounded-t-lg rounded-lg"
            />
            <p className="branded-text absolute bg-white px-2 rounded-md left-2 bottom-2 text-lg">
              HEALTH: {hp} / {maxHp} HP
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;
