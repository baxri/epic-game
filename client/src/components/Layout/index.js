import classNames from "classnames";
import { useGameContext } from "../../context";
import useAccount from "../../hooks/useAccount";

export default function Layout({ children, isArena }) {
  const { isConnected, address, connect, disconnect } = useAccount();
  const {
    characterNFT,
    handleBuy,
    buyState: { isBuyStarted, isBuyLoading },
  } = useGameContext();

  const isBuying = isBuyStarted || isBuyLoading;

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
      <div className="flex justify-between p-4">
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
      {isConnected && children}
    </div>
  );
}
