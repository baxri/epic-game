import "../../hooks/useAccount";
import useAccount from "../../hooks/useAccount";

import SelectCharacter from "../SelectCharacter";

export default function HomeScreen() {
  const { isConnected, address, connect, disconnect } = useAccount();

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="App">
      <div className="flex justify-between p-4">
        <h1 className="text-white font-bold text-4xl branded-text ">
          THE LAST OF <span className="text-primary">NFT</span>
        </h1>

        <button
          onClick={handleConnection}
          className="bg-primary px-4 text-white branded-text rounded-md"
        >
          {isConnected
            ? address.slice(0, 6) + "..." + address.slice(38, 42)
            : "Connect"}
        </button>
      </div>

      <SelectCharacter />
    </div>
  );
}
