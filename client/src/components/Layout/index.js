import classNames from "classnames";
import { Howl } from "howler";
import { useEffect, useState } from "react";

import { useGameContext } from "../../context";
import useAccount from "../../hooks/useAccount";

export default function Layout({ children, isArena }) {
  const { isConnected, address, connect, disconnect } = useAccount();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    characterNFT,
    handleBuy,
    buyState: { isBuyStarted, isBuyLoading },
  } = useGameContext();

  const isBuying = isBuyStarted || isBuyLoading;

  useEffect(() => {
    const sound = new Howl({
      src: "/audio/bg.mp3",
    });
    setSound(sound);
  }, []);

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div
      className={classNames(
        "pb-4 h-screen w-screen bg-cover bg-center min-h-screen bg-fixed fixed  overflow-y-auto",
        {
          "bg-ellie-background": !isArena,
          "bg-arena-background": isArena,
        }
      )}
    >
      <div className="flex justify-between p-4 mb-20">
        <h1 className="text-white font-bold text-4xl branded-text ">
          THE LAST OF <span className="text-primary">NFT</span>
        </h1>

        <div className="flex gap-4">
          {isConnected && characterNFT?.name && (
            <button
              onClick={() => {
                if (!isBuying) {
                  handleBuy();
                }
              }}
              className=" px-4 text-white branded-text rounded-md bg-orange-500"
            >
              {isBuying ? "In progress" : "BUY 50HP for 0.001 ETH"}
            </button>
          )}

          <button
            onClick={handleConnection}
            className="bg-primary px-4 text-white branded-text rounded-md"
          >
            {isConnected
              ? address.slice(0, 6) + "..." + address.slice(38, 42)
              : "Connect"}
          </button>
        </div>
      </div>
      {isConnected ? (
        children
      ) : (
        <div className="flex max-w-4xl m-auto gap-4 flex-col px-4">
          <p className="text-center text-white branded-text text-2xl">
            Immerse yourself in the world of "The Last of Us" with this
            thrilling game, where you can choose your character - Joel, Ellie or
            Abby - and engage in a battle against the formidable Bloater. Your
            success depends on your attack strategy, as you can either gain or
            lose HP points. Should you lose all your HP, fear not, as you can
            purchase new ones and continue the fight against the Bloater.
          </p>

          <p className="text-center text-white branded-text text-2xl">
            Every character will possess the status of a non-fungible token
            (NFT) with comprehensive functionalities, including the ability to
            send and transfer, as well as view their health points on the
            OpenSea platform. Sounds good? :)
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConnection}
              className="mt-10 bg-primary px-6 py-3 text-white branded-text rounded text-xl"
            >
              {isConnected
                ? address.slice(0, 6) + "..." + address.slice(38, 42)
                : "Get started"}
            </button>
            <button
              onClick={() => {
                if (isPlaying) {
                  sound.pause();
                  setIsPlaying(false);
                } else {
                  sound.play();
                  setIsPlaying(true);
                }
              }}
              className="mt-10 bg-orange-500 px-6 py-3 text-white branded-text rounded text-xl"
            >
              {!isPlaying ? "Play Music" : "Stop Music"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
